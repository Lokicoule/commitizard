import { yellow } from "picocolors";
import { Configuration } from "../../../../core/config/Configuration";
import { Scope } from "../../../../core/config/types";
import { promptSelect, promptText } from "../../../../libs/prompt";
import { CommitBuilder } from "../../../commit/builder/CommitBuilder";
import { AbstractCommitHandler } from "../../../commit/handlers/AbstractCommitHandler";
import { CommitHandler } from "../../../commit/handlers/CommitHandler";
import { CommitScope } from "../../../commit/types";

const ABORT_MESSAGE = yellow("✖") + " Commit scope selection aborted!";

export class ConventionalCommitScopeHandlerImpl
  extends AbstractCommitHandler
  implements CommitHandler
{
  private commitScopes: Scope[] = [];

  constructor() {
    super();
    this.commitScopes =
      Configuration.getConfig().conventional.cliOptions.scopes ?? [];
  }

  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    const commitScope = await this.selectCommitScope();
    commitBuilder.withScope(commitScope);
  }

  private async selectCommitScope(): Promise<CommitScope> {
    if (this.commitScopes?.length > 0) {
      return await this.promptSelectCommitScope();
    }

    return await this.promptTextCommitScope();
  }

  private async promptTextCommitScope(): Promise<CommitScope> {
    const commitScope = await promptText({
      message: "Enter commit scope (optional):",
      abortMessage: ABORT_MESSAGE,
    });

    return {
      data: commitScope,
    };
  }

  private async promptSelectCommitScope(): Promise<CommitScope> {
    const commitType = await promptSelect<Scope[], string>({
      message: "Select commit scope:",
      options: this.commitScopes,
      abortMessage: ABORT_MESSAGE,
    });

    return {
      data: commitType,
    };
  }
}
