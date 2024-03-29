import { CliOptions } from "~/core/configuration/types";
import { CommitBuilder } from "~/modules/commit/builder/CommitBuilder";
import { CommitType } from "~/modules/commit/builder/types";
import { BaseRedGreenRefactorHandler } from "../BaseRedGreenRefactorHandler";

export class RedGreenRefactorTypeHandler extends BaseRedGreenRefactorHandler {
  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    const types =
      this.configurationManager.getRedGreenRefactorCliOptionsTypes();
    if (types.length === 0) {
      throw new Error(
        "No red-green-refactor commit types defined in configuration!"
      );
    }

    const commitType = await this.selectCommitType(types);
    commitBuilder.withType(commitType);
  }

  private async selectCommitType(types: CliOptions[]): Promise<CommitType> {
    const commitType = await this.promptManager.select<CliOptions[], string>({
      message: "Select commit type:",
      options: types,
      abortMessage: "Commit type selection aborted!",
    });

    return {
      message: commitType,
    };
  }
}
