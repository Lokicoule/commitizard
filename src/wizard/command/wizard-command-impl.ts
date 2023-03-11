import { intro } from "@clack/prompts";
import { Command } from "commander";
import { CommitBuilderFactory } from "../../commit";
import { Config, loadConfig } from "../../config/config-helper";
import { CommitBreakingChangesHandler } from "../handlers/commit-breaking-changes-handler";
import { CommitConfirmHandler } from "../handlers/commit-confirm-handler";
import { CommitIssueNumbersHandler } from "../handlers/commit-issue-numbers-handler";
import { CommitMessageHandler } from "../handlers/commit-message-handler";
import { CommitScopeHandler } from "../handlers/commit-scope-handler";
import { CommitTypeHandler } from "../handlers/commit-type-handler";
import { WizardCommand } from "../interface/wizard-command";

export class WizardCommandImpl extends Command implements WizardCommand {
  private config!: Config;

  constructor(
    private readonly typeHandler: CommitTypeHandler,
    private readonly scopeHandler: CommitScopeHandler,
    private readonly messageHandler: CommitMessageHandler,
    private readonly breakingChangesHandler: CommitBreakingChangesHandler,
    private readonly issueNumbersHandler: CommitIssueNumbersHandler,
    private readonly confirmHandler: CommitConfirmHandler
  ) {
    super();
  }

  async run(configPath?: string): Promise<void> {
    intro("GitHub Commit Message Wizard");

    this.config = loadConfig(configPath);

    const builder = CommitBuilderFactory.create();

    this.typeHandler
      .updateCommitTypes(this.config.commitTypes)
      .setNext(this.scopeHandler)
      .setNext(this.messageHandler)
      .setNext(this.breakingChangesHandler)
      .setNext(this.issueNumbersHandler)
      .setNext(this.confirmHandler);

    await this.typeHandler.handle(builder);
  }
}
