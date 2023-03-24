import { Command } from "commander";
import { PromptAdapterFactory } from "~/adapters/prompt/PromptAdapterFactory";
import {
  ConfigurationManagerFactory,
  ConfigurationService,
} from "~/core/configuration";
import { GitManagerFactory } from "~/core/git";
import { PromptManagerFactory } from "~/core/prompt/manager/PromptManagerFactory";
import { ConventionalStrategy } from "~/modules/conventional/strategy/ConventionalStrategy";
import { RedGreenRefactorStrategy } from "~/modules/red-green-refactor/strategy/RedGreenRefactorStrategy";
import { WizardCommitBuilderFactory } from "../../builder/WizardCommit";
import { WizardCommitHandlerFactory } from "../../handlers/WizardCommitHandlerFactory";
import { WizardCommand } from "../WizardCommand";

export class WizardCommandImpl extends Command implements WizardCommand {
  private readonly configurationService: ConfigurationService;
  constructor(configurationService: ConfigurationService) {
    super();
    this.configurationService = configurationService;
  }

  async run(configPath?: string): Promise<void> {
    const promptManager = PromptManagerFactory.create(
      PromptAdapterFactory.createClackPromptAdapter()
    );

    promptManager.intro({
      message: "Welcome to the commit wizard!",
    });

    const config = this.configurationService.load(configPath);
    const configurationManager = ConfigurationManagerFactory.create(config);
    const gitManager = GitManagerFactory.create({
      exclude: configurationManager.getExcludePaths(),
    });
    const wizardHandlerFactory = new WizardCommitHandlerFactory(
      promptManager,
      configurationManager,
      gitManager,
      new ConventionalStrategy(promptManager, configurationManager),
      new RedGreenRefactorStrategy(promptManager, configurationManager)
    );

    const builder = WizardCommitBuilderFactory.create();
    const wizardHandlerChain = wizardHandlerFactory
      .createWizardCommitStagingHandler()
      .setNext(wizardHandlerFactory.createWizardCommitMessageGeneratorHandler())
      .setNext(wizardHandlerFactory.createWizardCommitConfirmationHandler())
      .setNext(wizardHandlerFactory.createWizardCommitRunnerHandler());

    await wizardHandlerChain.handle(builder);
  }
}
