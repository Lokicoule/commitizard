import { Command } from "commander";
import { PromptAdapterFactory } from "~/adapters/prompt/PromptAdapterFactory";
import {
  ConfigurationManagerFactory,
  ConfigurationService,
  DEFAULT_CONFIG_PATH,
} from "~/core/configuration";
import { GitManagerFactory } from "~/core/git";
import { PromptManagerFactory } from "~/core/prompt/manager/PromptManagerFactory";
import { CommitConventionStrategyType } from "~/modules/commit/strategy/CommitConventionStrategy";
import { ConventionalStrategy } from "~/modules/conventional/strategy/ConventionalStrategy";
import { RedGreenRefactorStrategy } from "~/modules/red-green-refactor/strategy/RedGreenRefactorStrategy";
import { WizardCommitBuilderFactory } from "../builder/WizardCommit";
import { WizardCommitHandlerChainBuilder } from "../handlers/WizardCommitHandlerBuilder";

type SubcommandOptions = {
  config?: string;
  displayStagedFiles?: boolean;
  selectFiles?: boolean;
  strategy?: CommitConventionStrategyType;
};

type SubcommandFactoryOptions = {
  name: string;
  aliases: string[];
  description: string;
  handleAction: (options: SubcommandOptions) => Promise<void>;
};

export class WizardCommand extends Command {
  constructor(private readonly configurationService: ConfigurationService) {
    super();
    this.configure();
  }

  private configure(): void {
    this.name("wizard")
      .description("A CLI tool for generating commit messages")
      .version("0.0.1")
      .enablePositionalOptions()
      .option(
        "-c, --config <path>",
        "Path to the configuration file",
        DEFAULT_CONFIG_PATH
      )
      .option(
        "-D, --no-display-staged-files",
        "Display staged files before prompting for commit message"
      )
      .option(
        "-S, --no-select-files",
        "Prompt user to select files to stage before prompting for commit message"
      )
      .option("-s, --strategy [strategy]", "Commit message strategy to use")
      .action(async (options: SubcommandOptions) => {
        await this.handleAction(options);
      });

    this.addDefaultCommand();
    this.addRedGreenRefactorCommand();
    this.addConventionalCommand();
    this.passThroughOptions();
  }

  private addDefaultCommand(): void {
    this.addCommand(
      this.createSubcommandFactory({
        name: "default",
        aliases: [],
        description: "Commit message generator with default options",
        handleAction: async (options) => {
          await this.handleAction(options);
        },
      })
    );
  }

  private addRedGreenRefactorCommand(): void {
    this.addCommand(
      this.createSubcommandFactory({
        name: "red-green-refactor",
        aliases: ["rg", "rgr", "tdd"],
        description:
          "Commit message generator following the red-green-refactor pattern",
        handleAction: async (options) => {
          await this.handleAction({
            ...options,
            strategy: CommitConventionStrategyType.RED_GREEN_REFACTOR,
          });
        },
      })
    );
  }

  private addConventionalCommand(): void {
    this.addCommand(
      this.createSubcommandFactory({
        name: "conventional",
        aliases: ["conv", "convention", "cv", "cc", "c"],
        description:
          "Commit message generator following the conventional pattern",
        handleAction: async (options) => {
          await this.handleAction({
            ...options,
            strategy: CommitConventionStrategyType.CONVENTIONAL,
          });
        },
      })
    );
  }

  private async handleAction({
    config = DEFAULT_CONFIG_PATH,
    strategy,
    displayStagedFiles = true,
    selectFiles = true,
  }: {
    config?: string;
    strategy?: CommitConventionStrategyType;
    displayStagedFiles?: boolean;
    selectFiles?: boolean;
  }): Promise<void> {
    const configuration = this.configurationService.load(config);
    const configurationManager =
      ConfigurationManagerFactory.create(configuration);

    const gitManager = GitManagerFactory.create({
      exclude: configurationManager.getExcludePaths(),
    });

    const promptManager = PromptManagerFactory.create(
      PromptAdapterFactory.createClackPromptAdapter()
    );

    const wizardHandlerChainBuilder = new WizardCommitHandlerChainBuilder(
      promptManager,
      configurationManager,
      gitManager,
      new ConventionalStrategy(promptManager, configurationManager),
      new RedGreenRefactorStrategy(promptManager, configurationManager)
    )
      .withDisplayStagedFilesHandler(displayStagedFiles)
      .withCommitFileSelectionHandler(selectFiles)
      .withCommitMessageGeneratorHandler(strategy)
      .withCommitConfirmationHandler()
      .withCommitRunnerHandler();

    await wizardHandlerChainBuilder.buildAndExecute(
      WizardCommitBuilderFactory.create()
    );
  }

  private createSubcommandFactory({
    name,
    aliases,
    description,
    handleAction,
  }: SubcommandFactoryOptions) {
    return new Command(name)
      .aliases(aliases)
      .description(description)
      .option(
        "-c, --config [config]",
        "Use a specific configuration file",
        DEFAULT_CONFIG_PATH
      )
      .option(
        "-D, --no-display-staged-files",
        "Display staged files before prompting for commit message"
      )
      .option(
        "-S, --no-select-files",
        "Prompt user to select files to stage before prompting for commit message"
      )
      .action(async (options: SubcommandOptions) => {
        await handleAction(options);
      });
  }
}
