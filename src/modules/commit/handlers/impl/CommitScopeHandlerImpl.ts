import { yellow } from "picocolors";
import { Configuration } from "../../../../core/config/Configuration";
import { promptSelect, promptText } from "../../../../libs/prompt";
import { CommitBuilder } from "../../builder/CommitBuilder";
import { CommitScope, CommitScopeOption } from "../../types";
import { CommitScopeHandler } from "../CommitScopeHandler";
import { CommitHandlerImpl } from "./CommitHandlerImpl";

const ABORT_MESSAGE = yellow("✖") + " Commit scope selection aborted!";

export class CommitScopeHandlerImpl
  extends CommitHandlerImpl
  implements CommitScopeHandler
{
  private commitScopes: CommitScopeOption[] = [];

  constructor() {
    super();
    this.commitScopes = Configuration.getConfig().commitOptions.scopes ?? [];
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
    const commitType = await promptSelect<CommitScopeOption[], string>({
      message: "Select commit scope:",
      options: this.commitScopes,
      abortMessage: ABORT_MESSAGE,
    });

    return {
      data: commitType,
    };
  }
}
