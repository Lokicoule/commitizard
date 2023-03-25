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
      return;
    }

    if (updatedFiles.length > 0) {
      const commitUpdatedFiles = await promptManager.multiSelectPaginate<
        any,
        string
      >({
        pageSize: maxViewFiles,
        message: "Updated files to add to the commit:",
        confirmMessage: "files",
        options: updatedFiles.map((file) => ({
          label: file,
          value: file,
        })),
      });

      /*  const commitUpdatedFiles = await paginate(updatedFiles, {
        pageSize: maxViewFiles,
        multiSelectMessage: "Updated files to add to the commit:",
        confirmMessage: "files",
        promptManager,
      }); */
      filesToAdd.push(...commitUpdatedFiles);
    }

    if (createdFiles.length > 0) {
      const commitCreatedFiles = await promptManager.multiSelectPaginate<
        any,
        string
      >({
        pageSize: maxViewFiles,
        message: "Created files to add to the commit:",
        confirmMessage: "files",
        options: createdFiles.map((file) => ({
          label: file,
          value: file,
        })),
      }); /* 
      const commitCreatedFiles = await paginate(createdFiles, {
        pageSize: maxViewFiles,
        multiSelectMessage: "Created files to add to the commit:",
        confirmMessage: "files",
        promptManager,
      }); */
      filesToAdd.push(...commitCreatedFiles);
    }

    // Add selected files to the Git index
    if (filesToAdd.length > 0) {
      commitBuilder.withFiles(filesToAdd);
    }
  }
}
