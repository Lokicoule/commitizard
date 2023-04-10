import { ConfigurationManager } from "~/core/configuration";
import { GitManager } from "~/core/git";
import { PromptManager } from "~/core/prompt";
import {
  CommitConventionStrategy,
  CommitConventionStrategyType,
} from "~/modules/commit";
import { WizardCommitHandler } from "../WizardCommitHandler";
import { WizardCommitHandlerFactory } from "../factory/WizardCommitHandlerFactory";
import { WizardBuilder } from "../../builder";

export class WizardCommitHandlerChainBuilder {
  private readonly factory: WizardCommitHandlerFactory;
  private readonly handlers: WizardCommitHandler[] = [];

  constructor(
    promptManager: PromptManager,
    configurationManager: ConfigurationManager,
    gitManager: GitManager,
    conventionalStrategy: CommitConventionStrategy,
    redGreenRefactorStrategy: CommitConventionStrategy
  ) {
    this.factory = new WizardCommitHandlerFactory(
      promptManager,
      configurationManager,
      gitManager,
      conventionalStrategy,
      redGreenRefactorStrategy
    );
  }

  public withDisplayStagedFilesHandler(
    handle: boolean
  ): WizardCommitHandlerChainBuilder {
    if (handle)
      this.handlers.push(this.factory.createWizardDisplayStagedFilesHandler());
    return this;
  }

  public withCommitFileSelectionHandler(
    handle: boolean
  ): WizardCommitHandlerChainBuilder {
    if (handle)
      this.handlers.push(this.factory.createWizardCommitFileSelectionHandler());
    return this;
  }

  public withCommitMessageGeneratorHandler(
    strategy?: CommitConventionStrategyType
  ): WizardCommitHandlerChainBuilder {
    this.handlers.push(
      this.factory.createWizardCommitMessageGeneratorHandler(strategy)
    );
    return this;
  }

  public withCommitConfirmationHandler(): WizardCommitHandlerChainBuilder {
    this.handlers.push(this.factory.createWizardCommitConfirmationHandler());
    return this;
  }

  public withCommitRunnerHandler(): WizardCommitHandlerChainBuilder {
    this.handlers.push(this.factory.createWizardCommitRunnerHandler());
    return this;
  }

  public build(): WizardCommitHandler {
    return this.handlers.reduceRight((next, handler) => handler.setNext(next));
  }

  public buildAndExecute(builder: WizardBuilder): Promise<void> {
    return this.build().handle(builder);
  }
}
