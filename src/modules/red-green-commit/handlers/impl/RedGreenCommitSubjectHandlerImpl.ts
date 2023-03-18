import { promptText } from "../../../../libs/prompt";
import { CommitBuilder } from "../../../commit/builder/CommitBuilder";
import { AbstractCommitHandler } from "../../../commit/handlers/impl/AbstractCommitHandler";
import { CommitHandler } from "../../../commit/handlers/CommitHandler";
import { CommitSubject } from "../../../commit/types";

export class RedGreenCommitSubjectHandlerImpl
  extends AbstractCommitHandler
  implements CommitHandler
{
  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    const commitSubject = await this.selectCommitSubject();
    commitBuilder.withSubject(commitSubject);
  }

  private async selectCommitSubject(): Promise<CommitSubject> {
    const commitSubject = await this.promptCommitSubject();
    return commitSubject;
  }

  private async promptCommitSubject(): Promise<CommitSubject> {
    let commitMessage;

    while (!commitMessage) {
      commitMessage = await promptText({
        message: "Enter commit subject:",
        abortMessage: "Commit subject selection aborted!",
      });
    }

    return {
      data: commitMessage,
    };
  }
}
