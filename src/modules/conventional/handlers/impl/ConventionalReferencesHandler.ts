import { yellow } from "picocolors";
import { promptConfirm, promptText } from "../../../../libs/prompt";
import { CommitBuilder } from "../../builder/CommitBuilder";
import { CommitReferences } from "../../types";
import { BaseConventionalHandler } from "./BaseConventionalHandler";

const ABORT_MESSAGE = yellow("✖") + " Commit issue numbers aborted!";

export class ConventionalReferencesHandler extends BaseConventionalHandler {
  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    const commitReferences = await this.selectCommitReferences();
    commitBuilder.withReferences(commitReferences);
  }

  private async selectCommitReferences(): Promise<CommitReferences> {
    const commitReferences = await this.promptCommitReferences();
    return commitReferences;
  }

  private async promptCommitReferences(): Promise<CommitReferences> {
    let commitReferences: string[] = [];
    let isIssueAffected = await promptConfirm({
      defaultValue: false,
      message: "Does this commit reference any open issues?",
      abortMessage: ABORT_MESSAGE,
    });

    while (isIssueAffected) {
      const issueNumber = await promptText({
        message: "Please enter a reference number:",
        placeholder: "e.g., #123 or 123",
        abortMessage: ABORT_MESSAGE,
      });

      issueNumber &&
        commitReferences.push(
          issueNumber.startsWith("#") ? issueNumber : `#${issueNumber}`
        );

      isIssueAffected = await promptConfirm({
        defaultValue: false,
        message: "Does this commit affect any other open issues?",
        abortMessage: ABORT_MESSAGE,
      });
    }

    return { message: commitReferences.join(", ") };
  }
}
