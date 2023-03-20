import { ProcessBuilderFactory } from "../../../../core/process/factory/ProcessBuilderFactory";
import { getStagedFiles, getFiles } from "../../../../libs/git";
import {
  WizardCommitState,
  WizardCommitStateMachine,
} from "../../state-machine/WizardCommitStateMachine";
import { BaseWizardCommitHandler } from "./BaseWizardCommitHandler";
import { PromptManager } from "../../../../libs/prompt/PromptManager";

// Maximum number of files to show in output
const MAX_FILES_TO_SHOW = 5;

/**
 * Logs a list of files to the console.
 * @param files - Array of file names.
 * @param promptManager - Prompt manager instance.
 */
async function logFiles(
  files: string[],
  promptManager: PromptManager,
  maxViewFilesToShow: number = MAX_FILES_TO_SHOW
): Promise<void> {
  promptManager.log({
    message: `Found ${files.length} staged files:\n`,
    level: "info",
  });

  // Only show up to MAX_FILES_TO_SHOW files in output
  for (let file of files.slice(0, maxViewFilesToShow)) {
    promptManager.log({
      message: file,
      level: "info",
    });
  }

  // If there are more files, show a summary message
  if (files.length > maxViewFilesToShow) {
    promptManager.log({
      message: `(${files.length - maxViewFilesToShow} more files)`,
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
    const maxViewFiles =
      this.configuration.wizard.maxViewFilesToShow || MAX_FILES_TO_SHOW;

    // Get list of staged files
    const stagedFiles = await getStagedFiles();

    // If there are staged files, log them to the console
    await logFiles(stagedFiles, promptManager, maxViewFiles);

    if (stagedFiles.length <= maxViewFiles) {
      // Otherwise, prompt user to select updated files to add to the commit
      const updatedFiles = await getFiles();

      if (updatedFiles.length === 0) {
        promptManager.log({
          message: "You don't have any files to add to the commit.",
          level: "info",
        });
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
