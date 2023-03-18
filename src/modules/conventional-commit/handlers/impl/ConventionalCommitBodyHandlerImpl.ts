import { yellow } from "picocolors";
import { promptConfirm, promptText } from "../../../../libs/prompt";
import { CommitBuilder } from "../../../commit/builder/CommitBuilder";
import { AbstractCommitHandler } from "../../../commit/handlers/AbstractCommitHandler";
import { CommitHandler } from "../../../commit/handlers/CommitHandler";
import { CommitBody } from "../../../commit/types";

const ABORT_MESSAGE = yellow("✖") + " Commit body aborted!";

export class ConventionalCommitBodyHandlerImpl
  extends AbstractCommitHandler
  implements CommitHandler
{
  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    const commitBody = await this.selectCommitBody();
    commitBuilder.withBody(commitBody);
  }

  private async selectCommitBody(): Promise<CommitBody> {
    const commitBody = await this.promptCommitBody();
    return commitBody;
  }

  private async promptCommitBody(): Promise<CommitBody> {
    let bodyLines: string[] = [];
    let hasBody = await promptConfirm({
      defaultValue: false,
      message: "Does this commit have a body?",
      abortMessage: ABORT_MESSAGE,
    });

    while (hasBody) {
      const bodyLine = await promptText({
        message: "Please enter a body line:",
        abortMessage: ABORT_MESSAGE,
      });
      Boolean(bodyLine) && bodyLines.push(bodyLine);

      hasBody = await promptConfirm({
        defaultValue: false,
        message: "Do you need an other body line?",
        abortMessage: ABORT_MESSAGE,
      });
    }

    return {
      data: bodyLines.join("\n"),
    };
  }
}
