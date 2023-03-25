import { yellow } from "picocolors";
import { CommitBuilder } from "~/modules/commit/builder/CommitBuilder";
import { CommitFooter } from "~/modules/commit/types";
import { BaseConventionalHandler } from "../BaseConventionalHandler";

export const ABORT_MESSAGE = yellow("✖") + " Commit footer aborted!";

export class ConventionalFooterHandler extends BaseConventionalHandler {
  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    const commitFooter = await this.selectCommitFooter();
    commitBuilder.withFooter(commitFooter);
  }

  private async selectCommitFooter(): Promise<CommitFooter> {
    let footerLines: string[] = [];

    const hasFooter = await this.promptManager.confirm({
      defaultValue: false,
      message: "Does this commit have a footer?",
      abortMessage: ABORT_MESSAGE,
    });

    if (hasFooter) {
      footerLines = await this.promptManager.multiText({
        text: {
          message: "Please enter a footer line:",
          abortMessage: ABORT_MESSAGE,
        },
        confirm: {
          message: "Do you need another footer line?",
          abortMessage: ABORT_MESSAGE,
        },
      });
    }

    return {
      message: footerLines.join("\n"),
    };
  }
}
