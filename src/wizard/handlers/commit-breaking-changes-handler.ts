import { confirm, text } from "@clack/prompts";
import pc from "picocolors";
import { CommitBuilder } from "../../commit";
import { promptWithCancel } from "../../prompt/prompt-helper";
import { CommitHandler } from "./commit-handler";

const ABORT_MESSAGE = pc.yellow("✖") + " Commit breaking changes aborted!";

export class CommitBreakingChangesHandler extends CommitHandler {
  public async handle(commitBuilder: CommitBuilder): Promise<void> {
    await this.processInput(commitBuilder);
    await super.handle(commitBuilder);
  }

  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    let commitBreakingChanges: string[] = [];
    let isBreakingChange = await promptWithCancel(
      () =>
        confirm({
          initialValue: false,
          message: "Is this a breaking change?",
        }),
      ABORT_MESSAGE
    );

    while (isBreakingChange) {
      const breakingChange = await this.handleBreakingChange();
      Boolean(breakingChange) &&
        commitBreakingChanges.push(`- ${breakingChange}`);

      isBreakingChange = await promptWithCancel(
        () =>
          confirm({
            initialValue: false,
            message: "Is this an other breaking change?",
          }),
        ABORT_MESSAGE
      );
    }

    if (commitBreakingChanges.length > 0) {
      commitBuilder.withBody(
        `BREAKING CHANGE: \n${commitBreakingChanges.join("\n")}`
      );
    }
  }

  private async handleBreakingChange() {
    const breakingChange = await promptWithCancel<string>(
      () =>
        text({
          message: "Please enter a description for the breaking change:",
        }),
      ABORT_MESSAGE
    );

    return breakingChange?.trim();
  }
}
