import { WizardBuilder } from "../../builder";
import { BaseWizardCommitHandler } from "../BaseWizardCommitHandler";

/**
 * @class WizardCommitFileSelectionHandler
 * @extends BaseWizardCommitHandler
 * @implements WizardCommitHandler
 * @description
 * Wizard commit handler that adds files to the commit.
 */
export class WizardCommitFileSelectionHandler extends BaseWizardCommitHandler {
  protected async processInput(commitBuilder: WizardBuilder): Promise<void> {
    const filesToAdd: string[] = [];

    const maxViewFiles =
      this.configurationManager.getWizardMaxViewFilesToShow();

    const fileTypes = [
      {
        label: "Updated files to add to the commit:",
        getter: this.gitManager.getUpdatedFiles.bind(this.gitManager),
      },
      {
        label: "Created files to add to the commit:",
        getter: this.gitManager.getCreatedFiles.bind(this.gitManager),
      },
      {
        label: "Deleted files to add to the commit:",
        getter: this.gitManager.getDeletedFiles.bind(this.gitManager),
      },
    ];

    for (const { label, getter } of fileTypes) {
      const files = await getter();

      if (files.length > 0) {
        const fileOptions = files.map((file) => ({
          label: file,
          value: file,
        }));

        const commitFiles = await this.promptManager.multiSelectPaginate<
          typeof fileOptions,
          string
        >({
          pageSize: maxViewFiles,
          message: label,
          confirmMessage: "files",
          options: fileOptions,
        });

        filesToAdd.push(...commitFiles);
      }
    }

    if (filesToAdd.length > 0) {
      commitBuilder.withFiles(filesToAdd);
    }
  }
}
