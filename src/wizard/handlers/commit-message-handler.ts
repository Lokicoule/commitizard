import { CommitBuilder } from "../../commit";
import { PromptHelper } from "../../prompt/prompt-helper";
import { CommitHandler } from "./commit-handler";

export class CommitMessageHandler extends CommitHandler {
  public async handle(commitBuilder: CommitBuilder): Promise<void> {
    await this.processInput(commitBuilder);
    await super.handle(commitBuilder);
  }

  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    const commitMessage = await PromptHelper.promptText({
      message: "Enter commit message (optional):",
      abortMessage: "Commit message selection aborted!",
    });

    commitBuilder.withMessage(commitMessage);
  }
}
