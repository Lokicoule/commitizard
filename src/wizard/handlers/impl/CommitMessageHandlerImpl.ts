import { CommitBuilder } from "../../../commit";
import { promptText } from "../../../prompt/";
import { CommitHandler } from "../CommitHandler";
import { CommitMessageHandler } from "../CommitMessageHandler";

export class CommitMessageHandlerImpl
  extends CommitHandler
  implements CommitMessageHandler
{
  public async handle(commitBuilder: CommitBuilder): Promise<void> {
    await this.processInput(commitBuilder);
    await super.handle(commitBuilder);
  }

  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    const commitMessage = await promptText({
      message: "Enter commit message (optional):",
      abortMessage: "Commit message selection aborted!",
    });

    commitBuilder.withMessage(commitMessage);
  }
}
