import { Type } from "~/core/config/types";
import { CommitBuilder } from "~/modules/commit/builder/CommitBuilder";
import { CommitType } from "../../../commit/types";
import { BaseRedGreenRefactorHandler } from "./BaseRedGreenRefactorHandler";

export class RedGreenRefactorTypeHandler extends BaseRedGreenRefactorHandler {
  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    const types = this.configuration.redGreenRefactor?.cliOptions.types || [];
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
