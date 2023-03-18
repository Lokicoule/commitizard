import { Configuration } from "../../../../core/config/Configuration";
import { Type } from "../../../../core/config/types";
import { promptSelect } from "../../../../libs/prompt";
import { CommitBuilder } from "../../../commit/builder/CommitBuilder";
import { AbstractCommitHandler } from "../../../commit/handlers/impl/AbstractCommitHandler";
import { CommitHandler } from "../../../commit/handlers/CommitHandler";
import { CommitType } from "../../../commit/types";

export class RedGreenCommitTypeHandlerImpl
  extends AbstractCommitHandler
  implements CommitHandler
{
  private commitTypes: Type[];

  constructor() {
    super();
    this.commitTypes =
      Configuration.getConfig()["red-green-refactor"].cliOptions.types ?? [];
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
