import pc from "picocolors";
import { CommitBuilder } from "../../../commit";
import { promptConfirm, promptText } from "../../../prompt";
import { CommitBreakingChangesHandler } from "../CommitBreakingChangesHandler";
import { CommitHandler } from "../CommitHandler";

const ABORT_MESSAGE = pc.yellow("✖") + " Commit breaking changes aborted!";

export class CommitBreakingChangesHandlerImpl
  extends CommitHandler
  implements CommitBreakingChangesHandler
{
  public async handle(commitBuilder: CommitBuilder): Promise<void> {
    await this.processInput(commitBuilder);
    await super.handle(commitBuilder);
  }

  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
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
      Boolean(breakingChange) &&
        commitBreakingChanges.push(`- ${breakingChange}`);

      isBreakingChange = await promptConfirm({
        defaultValue: false,
        message: "Is this an other breaking change?",
        abortMessage: ABORT_MESSAGE,
      });
    }

    if (commitBreakingChanges.length > 0) {
      commitBuilder.withBody(
        `BREAKING CHANGE: \n${commitBreakingChanges.join("\n")}`
      );
    }
  }
}
