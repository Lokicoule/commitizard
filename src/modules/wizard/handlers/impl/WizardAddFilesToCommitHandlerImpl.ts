import { CommitBuilder } from "../../../commit/builder/CommitBuilder";
import { CommitHandlerImpl } from "../../../commit/handlers/impl/CommitHandlerImpl";
import { getUpdatedFiles } from "../../../../libs/git";
import { ProcessBuilderFactory } from "../../../../core/process/factory/ProcessBuilderFactory";
import { logMessage, promptMultiselect } from "../../../../libs/prompt";
import { WizardAddFilesToCommitHandler } from "../WizardAddFilesToCommitHandler";

export class WizardAddFilesToCommitHandlerImpl
  extends CommitHandlerImpl
  implements WizardAddFilesToCommitHandler
{
  public async handle(commitBuilder: CommitBuilder): Promise<void> {
    await this.processInput(commitBuilder);
    await super.handle(commitBuilder);
  }

  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    const updatedFiles = await getUpdatedFiles();
    if (updatedFiles?.length === 0) {
      logMessage("No updated files found");
      return;
    }

    const commitUpdatedFiles = await promptMultiselect<any, string>({
      message:
        "Select staged files (optional, press space to select, enter to confirm):",
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
