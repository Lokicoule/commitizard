import { yellow } from "picocolors";
import { promptConfirm, promptText } from "../../../../libs/prompt";
import { CommitBuilder } from "../../builder/CommitBuilder";
import { AbstractCommitHandler } from "./AbstractCommitHandler";
import { CommitHandler } from "../CommitHandler";
import { CommitFooter } from "../../types";

const ABORT_MESSAGE = yellow("✖") + " Commit footer aborted!";

export class ConventionalCommitFooterHandlerImpl
  extends AbstractCommitHandler
  implements CommitHandler
{
  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    const commitFooter = await this.selectCommitFooter();
    commitBuilder.withFooter(commitFooter);
  }

  private async selectCommitFooter(): Promise<CommitFooter> {
    const commitFooter = await this.promptCommitFooter();
    return commitFooter;
  }

  private async promptCommitFooter(): Promise<CommitFooter> {
    let footerLines: string[] = [];
    let hasFooter = await promptConfirm({
      defaultValue: false,
      message: "Does this commit have a footer?",
      abortMessage: ABORT_MESSAGE,
    });

    while (hasFooter) {
      const bodyLine = await promptText({
        message: "Please enter a footer line:",
        abortMessage: ABORT_MESSAGE,
      });
      Boolean(bodyLine) && footerLines.push(bodyLine);

      hasFooter = await promptConfirm({
        defaultValue: false,
        message: "Do you need an other footer line?",
        abortMessage: ABORT_MESSAGE,
      });
    }

    return {
      data: footerLines.join("\n"),
    };
  }
}
