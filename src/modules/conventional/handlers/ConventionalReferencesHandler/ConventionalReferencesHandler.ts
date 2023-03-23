import { yellow } from "picocolors";
import { CommitBuilder } from "~/modules/commit/builder/CommitBuilder";
import { CommitReferences } from "~/modules/commit/types";
import { BaseConventionalHandler } from "../BaseConventionalHandler";

export const ABORT_MESSAGE = yellow("✖") + " Commit issue numbers aborted!";

export class ConventionalReferencesHandler extends BaseConventionalHandler {
  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    if (commitBuilder.getType().message !== "fix") {
      return;
    }

    const commitReferences = await this.selectCommitReferences();
    commitBuilder.withReferences(commitReferences);
  }

  private async selectCommitReferences(): Promise<CommitReferences> {
    const commitReferences: string[] = [];

    let isIssueAffected = await this.promptManager.confirm({
      defaultValue: false,
      message: "Does this commit reference any open issues?",
      abortMessage: ABORT_MESSAGE,
    });

    while (isIssueAffected) {
      const issueNumber = await this.promptManager.text({
        message: "Please enter a reference number:",
        placeholder: "e.g., #123 or 123",
        abortMessage: ABORT_MESSAGE,
      });

      if (issueNumber) {
        commitReferences.push(
          issueNumber.startsWith("#") ? issueNumber : `#${issueNumber}`
        );
      }

      isIssueAffected = await this.promptManager.confirm({
        defaultValue: false,
        message: "Does this commit affect any other open issues?",
        abortMessage: ABORT_MESSAGE,
      });
    }

    return { message: commitReferences.join(", ") };
  }
}
