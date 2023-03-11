import { CommitBuilder } from "../../commit";
import { PromptHelper } from "../../prompt/prompt-helper";
import { CommitHandler } from "./commit-handler";

export interface CommitScopeHandler extends CommitHandler {
  handle(commitBuilder: CommitBuilder): Promise<void>;
}

export class CommitScopeHandlerImpl extends CommitHandler {
  public async handle(commitBuilder: CommitBuilder): Promise<void> {
    await this.processInput(commitBuilder);
    await super.handle(commitBuilder);
  }

  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    const commitScope = await PromptHelper.promptText({
      message: "Enter commit scope (optional):",
      abortMessage: "Commit scope selection aborted!",
    });

    commitBuilder.withScope(commitScope);
  }
}
