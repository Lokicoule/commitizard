import { CommitScope } from "../../types";
import { CommitScopeHandler } from "../CommitScopeHandler";
import { CommitHandlerImpl } from "./CommitHandlerImpl";
import { CommitBuilder } from "../../builder/CommitBuilder";
import { promptText } from "../../../prompt";

export class CommitScopeHandlerImpl
  extends CommitHandlerImpl
  implements CommitScopeHandler
{
  constructor() {
    super();
  }

  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    const commitScope = await this.selectCommitScope();
    commitBuilder.withScope(commitScope);
  }

  private async selectCommitScope(): Promise<CommitScope> {
    const commitScope = await this.promptCommitScope();
    return commitScope;
  }

  private async promptCommitScope(): Promise<CommitScope> {
    const commitScope = await promptText({
      message: "Enter commit scope (optional):",
      abortMessage: "Commit scope selection aborted!",
    });

    return {
      data: commitScope,
    };
  }
}
