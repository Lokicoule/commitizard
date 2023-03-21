import { Type } from "../../../../core/config/types";
import { CommitBuilder } from "../../../commit/builder/CommitBuilder";
import { CommitType } from "../../../commit/types";
import { BaseConventionalHandler } from "./BaseConventionalHandler";

export class ConventionalTypeHandler extends BaseConventionalHandler {
  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    const types = this.configuration.conventional?.cliOptions.types || [];
    if (types.length === 0) {
      throw new Error("No commit types available!");
    }

    const commitType = await this.selectCommitType(types);
    commitBuilder.withType(commitType);
  }

  private async selectCommitType(types: Type[]): Promise<CommitType> {
    const commitType = await this.promptManager.select<Type[], string>({
      message: "Select commit type:",
      options: types,
      abortMessage: "Commit type selection aborted!",
    });

    return {
      message: commitType,
    };
  }
}
