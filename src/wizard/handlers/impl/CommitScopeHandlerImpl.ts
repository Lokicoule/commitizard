import { CommitBuilder } from "../../../commit-old";
import { promptText } from "../../../prompt";
import { CommitHandler } from "../CommitHandler";
import { CommitScopeHandler } from "../CommitScopeHandler";

export class CommitScopeHandlerImpl
  extends CommitHandler
  implements CommitScopeHandler
{
  public async handle(commitBuilder: CommitBuilder): Promise<void> {
    await this.processInput(commitBuilder);
    await super.handle(commitBuilder);
  }

  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    const commitScope = await promptText({
      message: "Enter commit scope (optional):",
      abortMessage: "Commit scope selection aborted!",
    });

    commitBuilder.withScope(commitScope);
  }
}
