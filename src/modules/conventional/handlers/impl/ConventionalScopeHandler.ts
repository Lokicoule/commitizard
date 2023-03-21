import { yellow } from "picocolors";
import { Scope } from "../../../../core/config/types";
import { CommitBuilder } from "../../../commit/builder/CommitBuilder";
import { CommitScope } from "../../../commit/types";
import { BaseConventionalHandler } from "./BaseConventionalHandler";

const ABORT_MESSAGE = yellow("✖") + " Commit scope selection aborted!";

export class ConventionalScopeHandler extends BaseConventionalHandler {
  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    const scopes = this.configuration.conventional?.cliOptions?.scopes || [];
    const commitScope = await this.selectCommitScope(scopes);
    commitBuilder.withScope(commitScope);
  }

  private async selectCommitScope(scopes: Scope[]): Promise<CommitScope> {
    if (scopes.length > 0) {
      const result = await this.promptSelectCommitScope(scopes);

      console.log(result);
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

  private async promptSelectCommitScope(scopes: Scope[]): Promise<CommitScope> {
    const commitType = await this.promptManager.select<Scope[], string>({
      message: "Select commit scope:",
      options: scopes,
      abortMessage: ABORT_MESSAGE,
    });

    return {
      message: commitType,
    };
  }
}
