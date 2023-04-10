import { CommitBuilder } from "~/modules/commit/builder/CommitBuilder";
import { CommitBody } from "~/modules/commit/builder/types";
import { BaseRedGreenRefactorHandler } from "../BaseRedGreenRefactorHandler";

const ABORT_MESSAGE = "Commit body aborted!";

export class RedGreenRefactorBodyHandler extends BaseRedGreenRefactorHandler {
  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    const commitBody = await this.selectCommitBody();
    commitBuilder.withBody(commitBody);
  }

  private async selectCommitBody(): Promise<CommitBody> {
    let bodyLines: string[] = [];

    const hasBody = await this.promptManager.confirm({
      defaultValue: false,
      message: "Does this commit have a body?",
      abortMessage: ABORT_MESSAGE,
    });

    if (hasBody) {
      bodyLines = await this.promptManager.multiText({
        text: {
          message: "Please enter a body line:",
          abortMessage: ABORT_MESSAGE,
        },
        confirm: {
          message: "Do you need another body line?",
          abortMessage: ABORT_MESSAGE,
        },
      });
    }

    return {
      message: bodyLines.join("\n"),
    };
  }
}
