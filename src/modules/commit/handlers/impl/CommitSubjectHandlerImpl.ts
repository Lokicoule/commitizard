import { promptText } from "../../../../libs/prompt";
import { CommitBuilder } from "../../builder/CommitBuilder";
import { CommitSubject } from "../../types";
import { CommitHandler } from "../CommitHandler";
import { AbstractCommitHandler } from "../AbstractCommitHandler";

export class CommitSubjectHandlerImpl
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
