import { confirm, text } from "@clack/prompts";
import pc from "picocolors";
import { CommitBuilder } from "../../commit";
import { promptWithCancel } from "../../prompt/prompt-helper";
import { CommitHandler } from "./commit-handler";

const ABORT_MESSAGE = pc.yellow("✖") + " Commit issue numbers aborted!";

export class CommitIssueNumbersHandler extends CommitHandler {
  public async handle(commitBuilder: CommitBuilder): Promise<void> {
    await this.processInput(commitBuilder);
    await super.handle(commitBuilder);
  }

  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    let commitIssueNumbers: string[] = [];
    let isIssueAffected = await promptWithCancel<boolean>(
      () =>
        confirm({
          initialValue: false,
          message: "Does this commit affect any open issues?",
        }),
      ABORT_MESSAGE
    );

    while (isIssueAffected) {
      const issueNumber = await this.handleIssueNumber();
      issueNumber &&
        commitIssueNumbers.push(
          issueNumber.startsWith("#") ? issueNumber : `#${issueNumber}`
        );

      isIssueAffected = await promptWithCancel<boolean>(
        () =>
          confirm({
            initialValue: false,
            message: "Does this commit affect any other open issues?",
          }),
        ABORT_MESSAGE
      );
    }

    if (commitIssueNumbers.length > 0) {
      commitBuilder.withFooter(`Closes: ${commitIssueNumbers.join(", ")}`);
    }
  }

  private async handleIssueNumber() {
    const issueNumber = await promptWithCancel<string>(
      () =>
        text({
          message: "Please enter the issue number:",
          placeholder: "e.g., #123 or 123",
        }),
      ABORT_MESSAGE
    );

    return issueNumber?.trim();
  }
}
