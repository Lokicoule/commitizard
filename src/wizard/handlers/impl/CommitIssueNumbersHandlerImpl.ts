import pc from "picocolors";
import { CommitBuilder } from "../../../commit-old";
import { promptConfirm, promptText } from "../../../prompt";
import { CommitHandler } from "../CommitHandler";
import { CommitIssueNumbersHandler } from "../CommitIssueNumbersHandler";

const ABORT_MESSAGE = pc.yellow("✖") + " Commit issue numbers aborted!";

export class CommitIssueNumbersHandlerImpl
  extends CommitHandler
  implements CommitIssueNumbersHandler
{
  public async handle(commitBuilder: CommitBuilder): Promise<void> {
    await this.processInput(commitBuilder);
    await super.handle(commitBuilder);
  }

  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
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

    if (commitIssueNumbers.length > 0) {
      commitBuilder.addFooterLine(`Closes: ${commitIssueNumbers.join(", ")}`);
    }
  }
}
