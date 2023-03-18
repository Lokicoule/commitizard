import { yellow } from "picocolors";
import { promptConfirm, promptText } from "../../../../libs/prompt";
import { CommitBuilder } from "../../builder/CommitBuilder";
import { CommitIssueNumbers } from "../../types";
import { CommitHandler } from "../CommitHandler";
import { AbstractCommitHandler } from "../AbstractCommitHandler";

const ABORT_MESSAGE = yellow("✖") + " Commit issue numbers aborted!";

export class CommitIssueNumbersHandlerImpl
  extends AbstractCommitHandler
  implements CommitHandler
{
  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    const commitIssueNumbers = await this.selectCommitIssueNumbers();
    commitBuilder.withIssueNumbers(commitIssueNumbers);
  }

  private async selectCommitIssueNumbers(): Promise<CommitIssueNumbers> {
    const commitIssueNumbers = await this.promptCommitIssueNumbers();
    return commitIssueNumbers;
  }

  private async promptCommitIssueNumbers(): Promise<CommitIssueNumbers> {
    let commitIssueNumbers: string[] = [];
    let isIssueAffected = await promptConfirm({
      defaultValue: false,
      message: "Does this commit affect any open issues?",
      abortMessage: ABORT_MESSAGE,
    });

    while (isIssueAffected) {
      const issueNumber = await promptText({
        message: "Please enter the issue number:",
        placeholder: "e.g., #123 or 123",
        abortMessage: ABORT_MESSAGE,
      });

      issueNumber &&
        commitIssueNumbers.push(
          issueNumber.startsWith("#") ? issueNumber : `#${issueNumber}`
        );

      isIssueAffected = await promptConfirm({
        defaultValue: false,
        message: "Does this commit affect any other open issues?",
        abortMessage: ABORT_MESSAGE,
      });
    }

    return commitIssueNumbers.length > 0
      ? { title: "Closes", data: commitIssueNumbers.join(", ") }
      : { title: "", data: "" };
  }
}
