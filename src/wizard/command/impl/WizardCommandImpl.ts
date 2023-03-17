import { intro } from "@clack/prompts";
import { Command } from "commander";
import { CommitBuilderFactory } from "../../../commit-old";
import { Config, loadConfig } from "../../../config/configUtils";
import { Container, Inject, Injectable } from "../../../core/container";
import { CommitBreakingChangesHandler } from "../../handlers/CommitBreakingChangesHandler";
import { CommitConfirmHandler } from "../../handlers/CommitConfirmHandler";
import { CommitIssueNumbersHandler } from "../../handlers/CommitIssueNumbersHandler";
import { CommitScopeHandler } from "../../handlers/CommitScopeHandler";
import { CommitStagedFilesHandler } from "../../handlers/CommitStagedFilesHandler";
import { CommitSubjectHandler } from "../../handlers/CommitSubjectHandler";
import { CommitTypeHandler } from "../../handlers/CommitTypeHandler";
import { WizardModule } from "../../WizardModule";
import { WizardCommand } from "../WizardCommand";

export class WizardCommandImpl extends Command implements WizardCommand {
  private config!: Config;

  constructor(
    @Inject("CommitTypeHandler")
    private readonly typeHandler: CommitTypeHandler,
    @Inject()
    private readonly scopeHandler: CommitScopeHandler,
    @Inject()
    private readonly subjectHandler: CommitSubjectHandler,
    @Inject()
    private readonly breakingChangesHandler: CommitBreakingChangesHandler,
    @Inject()
    private readonly issueNumbersHandler: CommitIssueNumbersHandler,
    @Inject()
    private readonly stagedFilesHandler: CommitStagedFilesHandler,
    @Inject()
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
      .setNext(this.stagedFilesHandler)
      .setNext(
        this.confirmHandler.setMessageFormat(this.config.commitOptions.format)
      );

    await this.typeHandler.handle(builder);
  }
}
