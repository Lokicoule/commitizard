import { Configuration } from "../../../../core/config/Configuration";
import { promptSelect } from "../../../../libs/prompt";
import { CommitBuilder } from "../../builder/CommitBuilder";
import { CommitType } from "../../types";
import { CommitHandler } from "../CommitHandler";
import { AbstractCommitHandler } from "../AbstractCommitHandler";
import { Type } from "../../../../core/config/types";

export class CommitTypeHandlerImpl
  extends AbstractCommitHandler
  implements CommitHandler
{
  private commitTypes: Type[];

  constructor() {
    super();
    this.commitTypes = Configuration.getConfig().cliOptions.types ?? [];
  }

  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    if (this.commitTypes.length === 0) {
      throw new Error("No commit types available!");
    }

    const commitType = await this.selectCommitType();
    commitBuilder.withType(commitType);
  }

  private async selectCommitType(): Promise<CommitType> {
    const commitType = await this.promptCommitType();
    return commitType;
  }

  private async promptCommitType(): Promise<CommitType> {
    const commitType = await promptSelect<Type[], string>({
      message: "Select commit type:",
      options: this.commitTypes,
      abortMessage: "Commit type selection aborted!",
    });

    return {
      data: commitType,
    };
  }
}
