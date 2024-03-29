import { CommitBuilder } from "~/modules/commit/builder/CommitBuilder";
import { CommitBreakingChanges } from "~/modules/commit/builder/types";
import { BaseConventionalHandler } from "../BaseConventionalHandler";

const ABORT_MESSAGE = "Commit breaking changes aborted!";

export class ConventionalBreakingChangesHandler extends BaseConventionalHandler {
  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    const commitBreakingChanges = await this.selectCommitBreakingChanges();
    commitBuilder.withBreakingChanges(commitBreakingChanges);
  }

  private async selectCommitBreakingChanges(): Promise<CommitBreakingChanges> {
    let breakingChangeLines: string[] = [];

    const hasBreakingChange = await this.promptManager.confirm({
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
