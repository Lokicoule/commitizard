import { CommitBuilder } from "../../../commit";
import { promptText } from "../../../prompt";
import { CommitHandler } from "../CommitHandler";
import { CommitSubjectHandler } from "../CommitSubjectHandler";

export class CommitSubjectHandlerImpl
  extends CommitHandler
  implements CommitSubjectHandler
{
  public async handle(commitBuilder: CommitBuilder): Promise<void> {
    await this.processInput(commitBuilder);
    await super.handle(commitBuilder);
  }

  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    const commitMessage = await promptText({
      message: "Enter commit subject (optional):",
      abortMessage: "Commit subject selection aborted!",
    });

    commitBuilder.withSubject(commitMessage);
  }
}
