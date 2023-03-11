import pc from "picocolors";
import { CommitBuilder } from "../../commit";
import { PromptHelper } from "../../prompt/prompt-helper";
import { CommitHandler } from "./commit-handler";

const ABORT_MESSAGE = pc.yellow("✖") + " Commit issue numbers aborted!";

export class CommitIssueNumbersHandler extends CommitHandler {
  public async handle(commitBuilder: CommitBuilder): Promise<void> {
    await this.processInput(commitBuilder);
    await super.handle(commitBuilder);
  }

  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    let commitIssueNumbers: string[] = [];
    let isIssueAffected = await PromptHelper.promptConfirm({
      defaultValue: false,
      message: "Does this commit affect any open issues?",
      abortMessage: ABORT_MESSAGE,
    });

    while (isIssueAffected) {
      const issueNumber = await PromptHelper.promptText({
        message: "Please enter the issue number:",
        placeholder: "e.g., #123 or 123",
        abortMessage: ABORT_MESSAGE,
      });

      issueNumber &&
        commitIssueNumbers.push(
          issueNumber.startsWith("#") ? issueNumber : `#${issueNumber}`
        );

      isIssueAffected = await PromptHelper.promptConfirm({
        defaultValue: false,
        message: "Does this commit affect any other open issues?",
        abortMessage: ABORT_MESSAGE,
      });
    }

    if (commitIssueNumbers.length > 0) {
      commitBuilder.withFooter(`Closes: ${commitIssueNumbers.join(", ")}`);
    }
  }
}
