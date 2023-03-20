import { yellow } from "picocolors";
import { CommitBuilder } from "../../builder/CommitBuilder";
import { CommitBreakingChanges } from "../../types";
import { BaseConventionalHandler } from "./BaseConventionalHandler";

const ABORT_MESSAGE = yellow("✖") + " Commit breaking changes aborted!";

export class ConventionalBreakingChangesHandler extends BaseConventionalHandler {
  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    const commitBreakingChanges = await this.selectCommitBreakingChanges();
    commitBuilder.withBreakingChanges(commitBreakingChanges);
  }

  private async selectCommitBreakingChanges(): Promise<CommitBreakingChanges> {
    let breakingChangeLines: string[] = [];

    let hasBreakingChange = await this.promptManager.confirm({
      defaultValue: false,
      message: "Does this commit have a breaking change?",
      abortMessage: ABORT_MESSAGE,
    });

    if (hasBreakingChange) {
      breakingChangeLines = await this.promptManager.multiText({
        text: {
          message: "Please enter a breaking change line:",
          abortMessage: ABORT_MESSAGE,
        },
        confirm: {
          message: "Do you need another breaking change line?",
          abortMessage: ABORT_MESSAGE,
        },
      });
    }

    return {
      message: breakingChangeLines.join("\n"),
    };
  }
}
