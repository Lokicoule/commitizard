import { yellow } from "picocolors";
import { CliOptions } from "~/core/configuration/types";
import { CommitBuilder } from "~/modules/commit/builder/CommitBuilder";
import { CommitScope } from "~/modules/commit/types";
import { BaseConventionalHandler } from "../BaseConventionalHandler";

export const ABORT_MESSAGE = yellow("✖") + " Commit scope selection aborted!";

export class ConventionalScopeHandler extends BaseConventionalHandler {
  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    const scopes = this.configurationManager.getConventionalCliOptionsScopes();
    const commitScope = await this.selectCommitScope(scopes);
    commitBuilder.withScope(commitScope);
  }

  private async selectCommitScope(scopes: CliOptions[]): Promise<CommitScope> {
    if (scopes.length > 0) {
      const result = await this.promptSelectCommitScope(scopes);

      if (result.message.length > 0) {
        return result;
      }
    }

    return await this.promptTextCommitScope();
  }

  private async promptTextCommitScope(): Promise<CommitScope> {
    const commitScope = await this.promptManager.text({
      message: "Enter a scope for the commit (optional):",
      abortMessage: ABORT_MESSAGE,
    });

    return {
      message: commitScope,
    };
  }

  private async promptSelectCommitScope(
    scopes: CliOptions[]
  ): Promise<CommitScope> {
    const commitType = await this.promptManager.select<CliOptions[], string>({
      message: "Select commit scope:",
      options: scopes,
      abortMessage: ABORT_MESSAGE,
    });

    return {
      message: commitType,
    };
  }
}
