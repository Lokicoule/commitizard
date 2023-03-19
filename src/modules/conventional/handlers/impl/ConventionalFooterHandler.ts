import { yellow } from "picocolors";
import { CommitBuilder } from "../../builder/CommitBuilder";
import { CommitFooter } from "../../types";
import { BaseConventionalHandler } from "./BaseConventionalHandler";

const ABORT_MESSAGE = yellow("✖") + " Commit footer aborted!";

export class ConventionalFooterHandler extends BaseConventionalHandler {
  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    const commitFooter = await this.selectCommitFooter();
    commitBuilder.withFooter(commitFooter);
  }

  private async selectCommitFooter(): Promise<CommitFooter> {
    const footerLines: string[] = [];

    let hasFooter = await this.promptManager.confirm({
      defaultValue: false,
      message: "Does this commit have a footer?",
      abortMessage: ABORT_MESSAGE,
    });

    while (hasFooter) {
      const bodyLine = await this.promptManager.text({
        message: "Please enter a footer line:",
        abortMessage: ABORT_MESSAGE,
      });

      if (bodyLine) {
        footerLines.push(bodyLine);
      }

      hasFooter = await this.promptManager.confirm({
        defaultValue: false,
        message: "Do you need another footer line?",
        abortMessage: ABORT_MESSAGE,
      });
    }

    return {
      message: footerLines.join("\n"),
    };
  }
}
