import { outro } from "@clack/prompts";
import pc from "picocolors";
import { Configuration } from "../../../../core/config/Configuration";
import { ProcessBuilderFactory } from "../../../../core/process/factory/ProcessBuilderFactory";
import { promptConfirm } from "../../../../libs/prompt";
import { CommitBuilder } from "../../../commit/builder/CommitBuilder";
import { CommitFormatter } from "../../../commit/formatter/CommitFormatter";
import { Commit } from "../../../commit/types";
import { AbstractWizardCommitHandler } from "../AbstractWizardCommitHandler";
import { WizardCommitHandler } from "../WizardCommitHandler";

const SUCCESS_MESSAGE = `${pc.green("✔")} ${pc.bgGreen(
  " Commit created successfully!"
)}`;
const ABORT_MESSAGE = `${pc.yellow("✖")} Commit confirmation aborted!`;
const ERROR_MESSAGE = `${pc.red(
  "✖"
)} An error occurred while creating the commit!`;

export class WizardCommitValidationHandlerImpl
  extends AbstractWizardCommitHandler
  implements WizardCommitHandler
{
  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    let commit = commitBuilder.build();

    const commitMessage = CommitFormatter.format(commit);

    const confirmCommit = await promptConfirm({
      defaultValue: true,
      message: `Commit message: \n\n${pc.green(
        commitMessage
      )}\n\nDo you want to create this commit?`,
      abortMessage: ABORT_MESSAGE,
    });

    if (confirmCommit) {
      try {
        ProcessBuilderFactory.create()
          .addArg("commit")
          .addArg("-m")
          .addArg(commitMessage)
          .spawn("git");
        outro(SUCCESS_MESSAGE);
      } catch (error: any) {
        outro(`${ERROR_MESSAGE} ${pc.red(`\n${error.message}`)}`);
      }
    } else {
      outro(ABORT_MESSAGE);
    }
  }
}
