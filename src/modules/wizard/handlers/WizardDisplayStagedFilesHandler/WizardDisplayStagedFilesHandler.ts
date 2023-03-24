import { chunk } from "~/core/utils/chunk";
import { WizardCommitBuilder } from "../../builder/WizardCommit";
import { BaseWizardCommitHandler } from "../BaseWizardCommitHandler";

/**
 * @class WizardDisplayStagedFilesHandler
 * @extends BaseWizardCommitHandler
 * @implements WizardCommitHandler
 * @description
 * Wizard commit handler that displays staged files.
 */
export class WizardDisplayStagedFilesHandler extends BaseWizardCommitHandler {
  protected async processInput(
    _commitBuilder: WizardCommitBuilder
  ): Promise<void> {
    const maxViewFiles =
      this.configurationManager.getWizardMaxViewFilesToShow();

    const stagedFiles = await this.gitManager.getStagedFiles();

    if (!stagedFiles || stagedFiles.length === 0) {
      this.promptManager.log.warn("You don't have any staged files.");
      return;
    }

    const fileChunks = chunk(stagedFiles, maxViewFiles);
    const totalPages = fileChunks.length;

    for (let i = 0; i < fileChunks.length; i++) {
      const filesToShow = fileChunks[i];

      this.promptManager.log.info(
        `Staged files [Page ${
          i + 1
        }/${totalPages}]: (max ${maxViewFiles} files per page)`
      );

      for (let file of filesToShow) {
        this.promptManager.log.info(` ${file}`);
      }

      if (totalPages > 1 && i < totalPages - 1) {
        const shouldShowMore = await this.promptManager.confirm({
          message: "Show more?",
          defaultValue: false,
        });

        if (!shouldShowMore) {
          break;
        }
      }
    }
  }
}
