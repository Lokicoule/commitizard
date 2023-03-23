import { PromptManager } from "~/core/prompt/manager/PromptManager";
import {
  WizardCommitState,
  WizardCommitStateMachine,
} from "../../state-machine/WizardCommitStateMachine";
import { BaseWizardCommitHandler } from "./BaseWizardCommitHandler";

// Maximum number of files to show in output

/**
 * Logs a list of files to the console.
 * @param files - Array of file names.
 * @param promptManager - Prompt manager instance.
 */
async function logFiles(
  files: string[],
  promptManager: PromptManager,
  maxViewFilesToShow: number
): Promise<void> {
  promptManager.log.info(`Found ${files.length} staged files:\n`);

  // Only show up to MAX_FILES_TO_SHOW files in output
  for (let file of files.slice(0, maxViewFilesToShow)) {
    promptManager.log.info(file);
  }

  // If there are more files, show a summary message
  if (files.length > maxViewFilesToShow) {
    promptManager.log.info(`(${files.length - maxViewFilesToShow} more files)`);
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
    const maxViewFiles =
      this.configurationManager.getWizardMaxViewFilesToShow();

    // Get list of staged files
    const stagedFiles = await this.gitManager.getStagedFiles();

    // If there are staged files, log them to the console
    await logFiles(stagedFiles, promptManager, maxViewFiles);

    if (stagedFiles.length <= maxViewFiles) {
      // Otherwise, prompt user to select updated files to add to the commit
      const updatedFiles = await this.gitManager.getFiles();

      if (updatedFiles.length === 0) {
        promptManager.log.warn(
          "You don't have any files to add to the commit."
        );
      }

      // Prompt user to select files to add to the commit
      const commitUpdatedFiles = await promptManager.multiSelect<any, string>({
        message:
          "Select files (optional, press space to select, enter to confirm):",
        options: updatedFiles.map((file) => ({ value: file, label: file })),
      });

      // Add selected files to the Git index
      this.gitManager.addFiles(commitUpdatedFiles);
    }

    // Return the next state in the state machine
    return WizardCommitState.SELECT_COMMIT_CONVENTION;
  }
}
