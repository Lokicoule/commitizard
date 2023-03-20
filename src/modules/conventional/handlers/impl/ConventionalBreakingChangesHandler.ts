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
    const commitBreakingChanges: string[] = [];

    let isBreakingChange = await this.promptManager.confirm({
      defaultValue: false,
      message: "Does this commit have a breaking change?",
      abortMessage: ABORT_MESSAGE,
    });

    while (isBreakingChange) {
      const breakingChange = await this.promptManager.text({
        message: "Please enter a breaking change:",
        abortMessage: ABORT_MESSAGE,
      });

      if (breakingChange) {
        commitBreakingChanges.push(breakingChange);
      }

      isBreakingChange = await this.promptManager.confirm({
        defaultValue: false,
        message: "Do you need another breaking change?",
        abortMessage: ABORT_MESSAGE,
      });
    }

    return {
      message: commitBreakingChanges.join("\n"),
    };
  }
}
