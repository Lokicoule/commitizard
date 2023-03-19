import { ProcessBuilderFactory } from "../../../../core/process/factory/ProcessBuilderFactory";
import { getStagedFiles, getFiles } from "../../../../libs/git";
import {
  WizardCommitState,
  WizardCommitStateMachine,
} from "../../state-machine/WizardCommitStateMachine";
import { BaseWizardCommitHandler } from "./BaseWizardCommitHandler";

// Maximum number of files to show in output
const MAX_FILES_TO_SHOW = 5;

/**
 * Logs a list of files to the console.
 * @param files - Array of file names.
 * @param promptManager - Prompt manager instance.
 */
async function logFiles(files: string[], promptManager: any): Promise<void> {
  promptManager.log({
    message: `Found ${files.length} staged files:\nDisplaying up to ${MAX_FILES_TO_SHOW} files...`,
    level: "info",
  });

  // Only show up to MAX_FILES_TO_SHOW files in output
  for (let file of files.slice(0, MAX_FILES_TO_SHOW)) {
    promptManager.log({
      message: file,
      level: "info",
    });
  }

  // If there are more files, show a summary message
  if (files.length > MAX_FILES_TO_SHOW) {
    promptManager.log({
      message: `(${files.length - MAX_FILES_TO_SHOW} more files)`,
      level: "info",
    });
  }
}

/**
 * Handler class that adds new files to the Git commit.
 */
export class AddFilesToCommitHandler extends BaseWizardCommitHandler {
  async handle(
    _wizard: WizardCommitStateMachine
  ): Promise<WizardCommitState | null> {
    const { promptManager } = this;

    // Get list of staged files
    const stagedFiles = await getStagedFiles();

    // If there are staged files, log them to the console
    await logFiles(stagedFiles, promptManager);

    if (stagedFiles.length <= MAX_FILES_TO_SHOW) {
      // Otherwise, prompt user to select updated files to add to the commit
      const updatedFiles = await getFiles();

      if (updatedFiles.length === 0) {
        promptManager.log({
          message: "You have no updated files to commit!",
          level: "info",
        });
        return null;
      }

      // Prompt user to select files to add to the commit
      const commitUpdatedFiles = await promptManager.multiSelect<any, string>({
        message:
          "Select files (optional, press space to select, enter to confirm):",
        options: updatedFiles.map((file) => ({ value: file, label: file })),
      });

      // Add selected files to the Git index
      const processBuilder = ProcessBuilderFactory.create();
      processBuilder.addArgs(["add", ...commitUpdatedFiles]).spawn("git");
    }

    // Return the next state in the state machine
    return WizardCommitState.SELECT_COMMIT_CONVENTION;
  }
}
