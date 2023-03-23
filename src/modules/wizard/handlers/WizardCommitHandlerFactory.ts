import { ConfigurationManager } from "~/core/configuration";
import { GitManager } from "~/core/git";
import { PromptManager } from "~/core/prompt";
import { WizardCommitConfirmationHandler } from "./WizardCommitConfirmationHandler/WizardCommitConfirmationHandler";
import { WizardCommitHandler } from "./WizardCommitHandler";
import { WizardCommitMessageGeneratorHandler } from "./WizardCommitMessageGeneratorHandler/WizardCommitMessageGeneratorHandler";
import { WizardCommitRunnerHandler } from "./WizardCommitRunnerHandler/WizardCommitRunnerHandler";
import { WizardCommitStagingHandler } from "./WizardCommitStagingHandler/WizardCommitStagingHandler";

export class WizardCommitHandlerFactory {
  private readonly configurationManager: ConfigurationManager;
  private readonly promptManager: PromptManager;
  private readonly gitManager: GitManager;

  constructor(
    promptManager: PromptManager,
    configurationManager: ConfigurationManager,
    gitManager: GitManager
  ) {
    this.promptManager = promptManager;
    this.configurationManager = configurationManager;
    this.gitManager = gitManager;
  }

  public createWizardCommitConfirmationHandler(): WizardCommitHandler {
    return new WizardCommitConfirmationHandler(
      this.promptManager,
      this.configurationManager,
      this.gitManager
    );
  }

  public createWizardCommitStagingHandler(): WizardCommitHandler {
    return new WizardCommitStagingHandler(
      this.promptManager,
      this.configurationManager,
      this.gitManager
    );
  }

  public createWizardCommitMessageGeneratorHandler(): WizardCommitHandler {
    return new WizardCommitMessageGeneratorHandler(
      this.promptManager,
      this.configurationManager,
      this.gitManager
    );
  }

  public createWizardCommitRunnerHandler(): WizardCommitHandler {
    return new WizardCommitRunnerHandler(
      this.promptManager,
      this.configurationManager,
      this.gitManager
    );
  }
}
