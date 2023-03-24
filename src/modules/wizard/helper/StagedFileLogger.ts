import { PromptManager } from "~/core/prompt/manager/PromptManager";

/**
 * @class StagedFileLogger
 * @description
 * Helper class that logs a list of files, with pagination support.
 */
export class StagedFileLogger {
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
