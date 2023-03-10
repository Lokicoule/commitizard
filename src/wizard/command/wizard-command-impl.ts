import { intro, outro } from "@clack/prompts";
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

  constructor(configPath?: string) {
    super();
    if (configPath) {
      this.setup(configPath);
    }
  }

  private setup(configPath?: string): void {
    this.config = loadConfig(configPath);
  }

  async run(configPath?: string): Promise<void> {
    intro("GitHub Commit Message Wizard");

    this.setup(configPath);

    const builder = CommitBuilderFactory.create();

    const typeHandler = new CommitTypeHandler(this.config.commitTypes);
    const scopeHandler = new CommitScopeHandler();
    const messageHandler = new CommitMessageHandler();
    const breakingChangesHandler = new CommitBreakingChangesHandler();
    const issueNumbersHandler = new CommitIssueNumbersHandler();
    const confirmHandler = new CommitConfirmHandler();

    typeHandler
      .setNext(scopeHandler)
      .setNext(messageHandler)
      .setNext(breakingChangesHandler)
      .setNext(issueNumbersHandler)
      .setNext(confirmHandler);

    await typeHandler.handle(builder);

    outro("Commit message wizard finished!");
  }
}
