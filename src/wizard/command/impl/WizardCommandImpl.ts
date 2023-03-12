import { intro } from "@clack/prompts";
import { Command } from "commander";
import { CommitBuilderFactory } from "../../../commit";
import { Config, loadConfig } from "../../../config/configUtils";
import { CommitBreakingChangesHandler } from "../../handlers/CommitBreakingChangesHandler";
import { CommitConfirmHandler } from "../../handlers/CommitConfirmHandler";
import { CommitIssueNumbersHandler } from "../../handlers/CommitIssueNumbersHandler";
import { CommitSubjectHandler } from "../../handlers/CommitSubjectHandler";
import { CommitScopeHandler } from "../../handlers/CommitScopeHandler";
import { CommitTypeHandler } from "../../handlers/CommitTypeHandler";
import { WizardCommand } from "../WizardCommand";

export class WizardCommandImpl extends Command implements WizardCommand {
  private config!: Config;

  constructor(
    private readonly typeHandler: CommitTypeHandler,
    private readonly scopeHandler: CommitScopeHandler,
    private readonly subjectHandler: CommitSubjectHandler,
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
      .updateCommitTypes(this.config.commitOptions.types)
      .setNext(this.scopeHandler)
      .setNext(this.subjectHandler)
      .setNext(this.breakingChangesHandler)
      .setNext(this.issueNumbersHandler)
      .setNext(
        this.confirmHandler.setMessageFormat(this.config.commitOptions.format)
      );

    await this.typeHandler.handle(builder);
  }
}
