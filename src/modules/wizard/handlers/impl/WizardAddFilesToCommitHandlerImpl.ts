import { ProcessBuilderFactory } from "../../../../core/process/factory/ProcessBuilderFactory";
import { getStagedFiles, getUpdatedFiles } from "../../../../libs/git";
import { logMessage, promptMultiselect } from "../../../../libs/prompt";
import { CommitBuilder } from "../../../commit/builder/CommitBuilder";
import { AbstractWizardCommitHandler } from "../AbstractWizardCommitHandler";
import { WizardCommitHandler } from "../WizardCommitHandler";

export class WizardAddFilesToCommitHandlerImpl
  extends AbstractWizardCommitHandler
  implements WizardCommitHandler
{
  protected async processInput(_commitBuilder: CommitBuilder): Promise<void> {
    const updatedFiles = await getUpdatedFiles();

    if (updatedFiles.length === 0) {
      logMessage("No files to add to commit.");
      return;
    }

    const commitUpdatedFiles = await promptMultiselect<any, string>({
      message:
        "Select updated files (optional, press space to select, enter to confirm):",
      options: [
        ...updatedFiles.map((file) => ({
          value: file,
          label: file,
        })),
      ],
    });

    const processBuilder = ProcessBuilderFactory.create();

    processBuilder.addArgs(["add", ...commitUpdatedFiles]).spawn("git");
  }
}
