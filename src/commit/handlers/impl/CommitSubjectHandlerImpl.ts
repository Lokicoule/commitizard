import { CommitHandlerImpl } from "./CommitHandlerImpl";
import { CommitSubjectHandler } from "../CommitSubjectHandler";
import { CommitBuilder } from "../../builder/CommitBuilder";
import { CommitSubject } from "../../types";
import { promptText } from "../../../prompt";

export class CommitSubjectHandlerImpl
  extends CommitHandlerImpl
  implements CommitSubjectHandler
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
    const commitMessage = await promptText({
      message: "Enter commit subject (optional):",
      abortMessage: "Commit subject selection aborted!",
    });

    return {
      data: commitMessage,
    };
  }
}
