import { PromptManager } from "~/core/prompt/manager/PromptManager";
import { WizardCommitBuilder } from "../../builder/WizardCommit";
import { BaseWizardCommitHandler } from "../BaseWizardCommitHandler";

/**
 * @class StagedFileLogger
 * @description
 * Helper class that logs a list of files, with pagination support.
 */
class StagedFileLogger {
  /**
   * Logs the list of files with pagination support.
   */
  static async logFiles(
    files: string[],
    promptManager: PromptManager,
    maxViewFilesToShow: number
  ): Promise<void> {
    const totalPages = Math.ceil(files.length / maxViewFilesToShow);
    let currentPage = 1;

    while (currentPage <= totalPages) {
      const startIndex = (currentPage - 1) * maxViewFilesToShow;
      const endIndex = startIndex + maxViewFilesToShow;
      const filesToShow = files.slice(startIndex, endIndex);

      promptManager.log.info(
        `Staged files [Page ${currentPage}/${totalPages}]:`
      );

      for (let file of filesToShow) {
        promptManager.log.info(` - ${file}`);
      }

      if (totalPages > 1 && currentPage < totalPages) {
        const shouldShowMore = await promptManager.confirm({
          message: "Show more?",
          defaultValue: false,
        });

        if (!shouldShowMore) {
          break;
        }
      }

      currentPage++;
    }
  }
}

/**
 * @class WizardCommitStagingHandler
 * @extends BaseWizardCommitHandler
 * @implements WizardCommitHandler
 * @description
 * Wizard commit handler that adds files to the commit.
 */
export class WizardCommitStagingHandler extends BaseWizardCommitHandler {
  protected async processInput(
    _commitBuilder: WizardCommitBuilder
  ): Promise<void> {
    const { promptManager } = this;
    const filesToAdd = [];

    const maxViewFiles =
      this.configurationManager.getWizardMaxViewFilesToShow();

    // Get list of staged files
    const stagedFiles = await this.gitManager.getStagedFiles();

    // If there are staged files, log them to the console
    if (stagedFiles.length > 0) {
      await StagedFileLogger.logFiles(stagedFiles, promptManager, maxViewFiles);
    }

    // Prompt user to select updated and created files to add to the commit
    const updatedFiles = await this.gitManager.getUpdatedFiles();
    const createdFiles = await this.gitManager.getCreatedFiles();

    if (updatedFiles.length === 0 && createdFiles.length === 0) {
      promptManager.log.warn("You don't have any files to add to the commit.");
      return;
    }

    if (updatedFiles.length > 0) {
      const commitUpdatedFiles = await promptManager.multiSelect<any, string>({
        message:
          "Select updated files to add to the commit (optional, press space to select, enter to confirm):",
        options: updatedFiles.map((file) => ({ value: file, label: file })),
      });
      filesToAdd.push(...commitUpdatedFiles);
    }

    if (createdFiles.length > 0) {
      const commitCreatedFiles = await promptManager.multiSelect<any, string>({
        message:
          "Select created files to add to the commit (optional, press space to select, enter to confirm):",
        options: createdFiles.map((file) => ({ value: file, label: file })),
      });
      filesToAdd.push(...commitCreatedFiles);
    }

    // Add selected files to the Git index
    if (filesToAdd.length > 0) {
      this.gitManager.stageFiles(filesToAdd);
    }
  }
}
