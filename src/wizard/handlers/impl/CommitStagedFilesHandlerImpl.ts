import { CommitBuilder } from "../../../commit-old";
import { getStagedFiles } from "../../../git";
import { promptMultiselect } from "../../../prompt";
import { CommitHandler } from "../CommitHandler";
import { CommitStagedFilesHandler } from "../CommitStagedFilesHandler";

export class CommitStagedFilesHandlerImpl
  extends CommitHandler
  implements CommitStagedFilesHandler
{
  public async handle(commitBuilder: CommitBuilder): Promise<void> {
    await this.processInput(commitBuilder);
    await super.handle(commitBuilder);
  }

  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    const stagedFiles = await getStagedFiles();
    if (!stagedFiles) {
      return;
    }

    const commitStagedFiles = await promptMultiselect<any, string>({
      message:
        "Select staged files (optional, press space to select, enter to confirm):",
      options: [
        ...stagedFiles.map((file) => ({
          value: file,
          label: file,
        })),
      ],
    });
    commitBuilder.addFooterLine(
      `\nRelevant files:\n${commitStagedFiles.join("\n")}`
    );
  }
}
