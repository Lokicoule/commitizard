import { ProcessBuilderFactory } from "../../../../core/process/factory/ProcessBuilderFactory";
import { getStagedFiles, getUpdatedFiles } from "../../../../libs/git";
import {
  WizardCommitState,
  WizardCommitStateMachine,
} from "../../state-machine/WizardCommitStateMachine";
import { BaseWizardCommitHandler } from "./BaseWizardCommitHandler";

export class AddFilesToCommitHandler extends BaseWizardCommitHandler {
  public async handle(
    _wizard: WizardCommitStateMachine
  ): Promise<WizardCommitState | null> {
    const stagedFiles = await getStagedFiles();

    if (stagedFiles.length > 0) {
      this.promptManager.log({
        message: "Staged files:",
        level: "info",
      });
      stagedFiles.forEach((file) =>
        this.promptManager.log({
          message: file,
          level: "info",
        })
      );
    } else {
      const updatedFiles = await getUpdatedFiles();

      if (updatedFiles.length === 0) {
        this.promptManager.log({
          message: "No files to add to commit!",
          level: "info",
        });
        return null;
      }

      const commitUpdatedFiles = await this.promptManager.multiSelect<
        any,
        string
      >({
        message:
          "Select updated files (optional, press space to select, enter to confirm):",
        options: updatedFiles.map((file) => ({ value: file, label: file })),
      });

      const processBuilder = ProcessBuilderFactory.create();

      processBuilder.addArgs(["add", ...commitUpdatedFiles]).spawn("git");
    }
    return WizardCommitState.SELECT_COMMIT_CONVENTION;
  }
}
