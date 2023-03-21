import { CommitBuilder } from "../../../commit/builder/CommitBuilder";
import { CommitSubject } from "../../../commit/types";
import { BaseConventionalHandler } from "./BaseConventionalHandler";

export class ConventionalSubjectHandler extends BaseConventionalHandler {
  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    const commitSubject = await this.selectCommitSubject();
    commitBuilder.withSubject(commitSubject);
  }

  private async selectCommitSubject(): Promise<CommitSubject> {
    let commitMessage: string | undefined = undefined;

    while (!commitMessage) {
      commitMessage = await this.promptManager.text({
        message: "Enter commit subject:",
        abortMessage: "Commit subject selection aborted!",
      });
    }

    return {
      message: commitMessage,
    };
  }
}
