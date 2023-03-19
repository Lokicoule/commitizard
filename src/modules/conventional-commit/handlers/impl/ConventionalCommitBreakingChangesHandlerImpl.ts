import { yellow } from "picocolors";
import { promptConfirm, promptText } from "../../../../libs/prompt";
import { CommitBuilder } from "../../builder/CommitBuilder";
import { AbstractCommitHandler } from "./AbstractCommitHandler";
import { CommitHandler } from "../CommitHandler";
import { CommitBreakingChanges } from "../../types";

const ABORT_MESSAGE = yellow("✖") + " Commit breaking changes aborted!";

export class ConventionalCommitBreakingChangesHandlerImpl
  extends AbstractCommitHandler
  implements CommitHandler
{
  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    const commitBreakingChanges = await this.selectCommitBreakingChanges();
    commitBuilder.withBreakingChanges(commitBreakingChanges);
  }

  private async selectCommitBreakingChanges(): Promise<CommitBreakingChanges> {
    const commitBreakingChanges = await this.promptCommitBreakingChanges();
    return commitBreakingChanges;
  }

  private async promptCommitBreakingChanges(): Promise<CommitBreakingChanges> {
    let commitBreakingChanges: string[] = [];
    let isBreakingChange = await promptConfirm({
      defaultValue: false,
      message: "Is this a breaking change?",
      abortMessage: ABORT_MESSAGE,
    });

    while (isBreakingChange) {
      const breakingChange = await promptText({
        message: "Please enter a description for the breaking change:",
        abortMessage: ABORT_MESSAGE,
      });
      Boolean(breakingChange) && commitBreakingChanges.push(breakingChange);

      isBreakingChange = await promptConfirm({
        defaultValue: false,
        message: "Is this an other breaking change?",
        abortMessage: ABORT_MESSAGE,
      });
    }

    return {
      data: commitBreakingChanges.join("\n"),
    };
  }
}
