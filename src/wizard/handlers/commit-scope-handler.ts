import { text } from "@clack/prompts";
import { CommitBuilder } from "../../commit";
import { promptWithCancel } from "../../prompt/prompt-helper";
import { CommitHandler } from "./commit-handler";

export class CommitScopeHandler extends CommitHandler {
  public async handle(commitBuilder: CommitBuilder): Promise<void> {
    await this.processInput(commitBuilder);
    await super.handle(commitBuilder);
  }

  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    const commitScope = await promptWithCancel<string>(
      () =>
        text({
          message: "Enter commit scope (optional):",
        }),
      "Commit scope selection aborted!"
    );

    commitBuilder.withScope(commitScope);
  }
}
