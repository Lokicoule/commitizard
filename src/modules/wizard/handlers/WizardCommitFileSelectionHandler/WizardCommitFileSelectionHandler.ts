import { bgBlue } from "picocolors";
import { PromptManager } from "~/core/prompt";
import { chunk } from "~/core/utils/chunk";
import { WizardCommitBuilder } from "../../builder/WizardCommit";
import { BaseWizardCommitHandler } from "../BaseWizardCommitHandler";

/**
 * @class WizardCommitFileSelectionHandler
 * @extends BaseWizardCommitHandler
 * @implements WizardCommitHandler
 * @description
 * Wizard commit handler that adds files to the commit.
 */
export class WizardCommitFileSelectionHandler extends BaseWizardCommitHandler {
  protected async processInput(
    commitBuilder: WizardCommitBuilder
  ): Promise<void> {
    const { promptManager } = this;
    const filesToAdd: string[] = [];

    const maxViewFiles =
      this.configurationManager.getWizardMaxViewFilesToShow();

    // Prompt user to select updated and created files to add to the commit
    const updatedFiles = await this.gitManager.getUpdatedFiles();
    const createdFiles = await this.gitManager.getCreatedFiles();

    if (updatedFiles.length === 0 && createdFiles.length === 0) {
      promptManager.log.warn("You don't have any files to add to the commit.");
      return;
    }

    if (updatedFiles.length > 0) {
      const commitUpdatedFiles = await paginate(updatedFiles, {
        pageSize: maxViewFiles,
        multiSelectMessage: "Updated files to add to the commit:",
        confirmMessage: "files",
        promptManager,
      });
      filesToAdd.push(...commitUpdatedFiles);
    }

    if (createdFiles.length > 0) {
      const commitCreatedFiles = await paginate(createdFiles, {
        pageSize: maxViewFiles,
        multiSelectMessage: "Created files to add to the commit:",
        confirmMessage: "files",
        promptManager,
      });
      filesToAdd.push(...commitCreatedFiles);
    }

    // Add selected files to the Git index
    if (filesToAdd.length > 0) {
      commitBuilder.withFiles(filesToAdd);
    }
  }
}

interface IPaginateOptions<T> {
  pageSize: number;
  multiSelectMessage: string;
  confirmMessage: string;
  promptManager: PromptManager;
}

async function paginate<T>(
  items: T[],
  options: IPaginateOptions<T>
): Promise<T[]> {
  const { pageSize, multiSelectMessage, confirmMessage, promptManager } =
    options;
  const itemChunks = chunk(items, pageSize);
  const totalPages = itemChunks.length;
  const results: T[] = [];

  for (let i = 0; i < itemChunks.length; i++) {
    const itemsToShow = itemChunks[i];
    const currentPage = i + 1;
    const remainingItems = items.length - (i * pageSize + itemsToShow.length);

    const message = `Page ${currentPage}/${totalPages}\n${bgBlue(
      multiSelectMessage
    )} (Press <space> to select, <enter> to continue / skip, <arrow keys> to navigate)`;

    const options = itemsToShow.map((item, index) => ({
      value: item,
      label: `${i * pageSize + index + 1}. ${item}`,
    }));

    const selectedOptions = await promptManager.multiSelect<any, T>({
      message,
      options,
    });

    results.push(...selectedOptions);

    const shouldShowMore =
      remainingItems > 0
        ? await promptManager.confirm({
            message: `Show ${Math.min(
              pageSize,
              remainingItems
            )} more ${confirmMessage}?`,
            defaultValue: true,
          })
        : false;

    if (!shouldShowMore) {
      break;
    }
  }

  return results;
}
