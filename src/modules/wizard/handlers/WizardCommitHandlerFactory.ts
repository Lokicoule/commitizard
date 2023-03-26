import { ConfigurationManager } from "~/core/configuration";
import { GitManager } from "~/core/git";
import { PromptManager } from "~/core/prompt";
import {
  CommitConventionStrategy,
  CommitConventionStrategyType,
} from "~/modules/commit/strategy/CommitConventionStrategy";
import { WizardCommitConfirmationHandler } from "./WizardCommitConfirmationHandler/WizardCommitConfirmationHandler";
import { WizardCommitFileSelectionHandler } from "./WizardCommitFileSelectionHandler/WizardCommitFileSelectionHandler";
import { WizardCommitHandler } from "./WizardCommitHandler";
import { WizardCommitMessageGeneratorHandler } from "./WizardCommitMessageGeneratorHandler/WizardCommitMessageGeneratorHandler";
import { WizardCommitRunnerHandler } from "./WizardCommitRunnerHandler/WizardCommitRunnerHandler";
import { WizardDisplayStagedFilesHandler } from "./WizardDisplayStagedFilesHandler/WizardDisplayStagedFilesHandler";

export class WizardCommitHandlerFactory {
  private readonly configurationManager: ConfigurationManager;
  private readonly promptManager: PromptManager;
  private readonly gitManager: GitManager;
  private readonly conventionalStrategy: CommitConventionStrategy;
  private readonly redGreenRefactorStrategy: CommitConventionStrategy;

  constructor(
    promptManager: PromptManager,
    configurationManager: ConfigurationManager,
    gitManager: GitManager,
    conventionalStrategy: CommitConventionStrategy,
    redGreenRefactorStrategy: CommitConventionStrategy
  ) {
    this.promptManager = promptManager;
    this.configurationManager = configurationManager;
    this.gitManager = gitManager;
    this.conventionalStrategy = conventionalStrategy;
    this.redGreenRefactorStrategy = redGreenRefactorStrategy;
  }

  public createWizardCommitConfirmationHandler(): WizardCommitHandler {
    return new WizardCommitConfirmationHandler(
      this.promptManager,
      this.configurationManager,
      this.gitManager
    );
  }

  public createWizardCommitFileSelectionHandler(): WizardCommitHandler {
    return new WizardCommitFileSelectionHandler(
      this.promptManager,
      this.configurationManager,
      this.gitManager
    );
  }

  public createWizardCommitMessageGeneratorHandler(
    strategy?: CommitConventionStrategyType
  ): WizardCommitHandler {
    return new WizardCommitMessageGeneratorHandler(
      this.promptManager,
      this.configurationManager,
      this.gitManager,
      this.conventionalStrategy,
      this.redGreenRefactorStrategy,
      strategy
    );
  }

  public createWizardCommitRunnerHandler(): WizardCommitHandler {
    return new WizardCommitRunnerHandler(
      this.promptManager,
      this.configurationManager,
      this.gitManager
    );
  }

  public createWizardDisplayStagedFilesHandler(): WizardCommitHandler {
    return new WizardDisplayStagedFilesHandler(
      this.promptManager,
      this.configurationManager,
      this.gitManager
    );
  }
}
