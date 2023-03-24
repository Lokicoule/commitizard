import { PromptManager } from "~/core/prompt";
import { WizardCommitBuilder } from "../../builder/WizardCommit";
import { StagedFileLogger } from "../../helper/StagedFileLogger";
import { BaseWizardCommitHandler } from "../BaseWizardCommitHandler";

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
    const filesToAdd: string[] = [];

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
      await paginate(updatedFiles, maxViewFiles, promptManager).then(
        (commitUpdatedFiles) => {
          filesToAdd.push(...commitUpdatedFiles);
        }
      );
    }

    if (createdFiles.length > 0) {
      await paginate(createdFiles, maxViewFiles, promptManager).then(
        (commitCreatedFiles) => {
          filesToAdd.push(...commitCreatedFiles);
        }
      );
    }

    // Add selected files to the Git index
    if (filesToAdd.length > 0) {
      this.gitManager.stageFiles(filesToAdd);
    }
  }
}

async function paginate<T>(
  items: T[],
  pageSize: number,
  promptManager: PromptManager
): Promise<T[]> {
  const totalPages = Math.ceil(items.length / pageSize);
  let currentPage = 1;
  let currentIndex = 0;
  const results: T[] = [];

  while (currentPage <= totalPages) {
    const pageItems = items.slice(currentIndex, currentIndex + pageSize);
    const options = pageItems.map((item, index) => ({
      value: item,
      label: `${currentIndex + index + 1}. ${item}`,
    }));
    const message = `Page ${currentPage}/${totalPages}\nPress space to select/deselect, enter to confirm, q to quit:`;

    const selectedOptions = await promptManager.multiSelect<any, T>({
      message,
      options,
    });

    results.push(...selectedOptions);

    if (currentIndex + pageSize >= items.length) {
      break;
    }

    const showMore = await promptManager.confirm({
      message: `Show ${pageSize} more items?`,
      defaultValue: true,
    });

    if (!showMore) {
      // Quit if the user chooses not to show more items
      break;
    }

    currentIndex += pageSize;
    currentPage += 1;
  }

  return results;
}
