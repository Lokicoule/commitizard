import { CliOptions } from "~/core/configuration/types";
import { CommitBuilder } from "~/modules/commit/builder/CommitBuilder";
import { CommitType } from "~/modules/commit/builder/types";
import { BaseConventionalHandler } from "../BaseConventionalHandler";

export class ConventionalTypeHandler extends BaseConventionalHandler {
  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    const types = this.configurationManager.getConventionalCliOptionsTypes();
    if (types.length === 0) {
      throw new Error("No conventional commit types defined in configuration!");
    }

    const commitType = await this.selectCommitType(types);
    commitBuilder.withType(commitType);
  }

  private async selectCommitType(types: CliOptions[]): Promise<CommitType> {
    const commitType = await this.promptManager.select<CliOptions[], string>({
      message: "Select commit type:",
      options: types,
      abortMessage: "Commit type aborted!",
    });

    return {
      message: commitType,
    };
  }
}
