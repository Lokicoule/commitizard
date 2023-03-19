import { promptText } from "../../../../libs/prompt";
import { CommitBuilder } from "../../builder/CommitBuilder";
import { CommitSubject } from "../../types";
import { BaseConventionalHandler } from "./BaseConventionalHandler";

export class ConventionalSubjectHandler extends BaseConventionalHandler {
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
      message: commitMessage,
    };
  }
}
