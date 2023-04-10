import { CommitBuilder } from "~/modules/commit/builder/CommitBuilder";
import { CommitSubject } from "~/modules/commit/builder/types";
import { BaseConventionalHandler } from "../BaseConventionalHandler";

export class ConventionalSubjectHandler extends BaseConventionalHandler {
  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    const commitSubject = await this.selectCommitSubject();
    commitBuilder.withSubject(commitSubject);
  }

  private async selectCommitSubject(): Promise<CommitSubject> {
    const commitSubject = await this.promptManager.text({
      message: "Enter commit subject:",
      abortMessage: "Commit subject aborted!",
      validate: (value) =>
        value.length === 0 ? `Subject is required!` : undefined,
    });

    return {
      message: commitSubject,
    };
  }
}
