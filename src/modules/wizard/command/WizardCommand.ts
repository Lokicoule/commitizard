import { Command } from "commander";
import { PromptAdapterFactory } from "~/adapters/prompt/PromptAdapterFactory";
import {
  Configuration,
  ConfigurationManager,
  ConfigurationManagerFactory,
  ConfigurationService,
  DEFAULT_CONFIG_PATH,
} from "~/core/configuration";
import { GitManager, GitManagerFactory } from "~/core/git";
import { PromptManager } from "~/core/prompt";
import { PromptManagerFactory } from "~/core/prompt/manager/PromptManagerFactory";
import { ConventionalStrategy } from "~/modules/conventional/strategy/ConventionalStrategy";
import { RedGreenRefactorStrategy } from "~/modules/red-green-refactor/strategy/RedGreenRefactorStrategy";
import { WizardCommitBuilderFactory } from "../builder/WizardCommit";
import { WizardCommitHandlerFactory } from "../handlers/WizardCommitHandlerFactory";

export class WizardCommand extends Command {
  private readonly configurationService: ConfigurationService;
  constructor(configurationService: ConfigurationService) {
    super();
    this.configurationService = configurationService;

    this.name("wizard");
    this.description("A CLI tool for generating commit messages");
    this.version("0.0.1");

    // Add a default action for the wizard command
    this.action(async () => {
      await this.runSubcommand("default");
    });

    this.addCommand(
      new Command("default")
        .description("Default commit message generator")
        .option(
          "-p, --path [path]",
          "Path to clean up the application",
          DEFAULT_CONFIG_PATH
        )
        .action(async (options) => {
          const promptManager = PromptManagerFactory.create(
            PromptAdapterFactory.createClackPromptAdapter()
          );

          promptManager.intro({
            message: "Welcome to the commit wizard!",
          });

          const path = options.path;
          const config = this.loadConfig(path);
          const configurationManager =
            ConfigurationManagerFactory.create(config);
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
            .creatWizardDisplayStagedFilesHandler()
            .setNext(
              wizardHandlerFactory.createWizardCommitFileSelectionHandler()
            )
            .setNext(
              wizardHandlerFactory.createWizardCommitMessageGeneratorHandler()
            )
            .setNext(
              wizardHandlerFactory.createWizardCommitConfirmationHandler()
            )
            .setNext(wizardHandlerFactory.createWizardCommitRunnerHandler());

          await wizardHandlerChain.handle(builder);
        })
    )
      .addCommand(
        new Command("red-green-refactor")
          .aliases(["rgr", "tdd"])
          .description(
            "Commit message generator following the red-green-refactor pattern"
          )
          .option(
            "-p, --path [path]",
            "Path to clean up the application",
            DEFAULT_CONFIG_PATH
          )
          .action(async (options) => {
            const path = options.path;
            const config = this.loadConfig(path);
            const configurationManager =
              ConfigurationManagerFactory.create(config);
            const gitManager = GitManagerFactory.create({
              exclude: configurationManager.getExcludePaths(),
            });
          })
      )
      .addCommand(
        new Command("conventional")
          .aliases(["conv", "cc"])
          .description(
            "Commit message generator following the conventional commit pattern"
          )
          .option(
            "-p, --path [path]",
            "Path to clean up the application",
            DEFAULT_CONFIG_PATH
          )
          .action(async (options) => {
            const path = options.path;
            const config = this.loadConfig(path);
            const configurationManager =
              ConfigurationManagerFactory.create(config);
            const gitManager = GitManagerFactory.create({
              exclude: configurationManager.getExcludePaths(),
            });
          })
      );
  }

  private provideConfigurationManager(
    configuration: Configuration
  ): ConfigurationManager {
    const configurationManager =
      ConfigurationManagerFactory.create(configuration);
    return configurationManager;
  }

  private provideGitManager(
    configurationManager: ConfigurationManager
  ): GitManager {
    const gitManager = GitManagerFactory.create({
      exclude: configurationManager.getExcludePaths(),
    });
    return gitManager;
  }

  private providePromptManager(): PromptManager {
    const promptManager = PromptManagerFactory.create(
      PromptAdapterFactory.createClackPromptAdapter()
    );
    return promptManager;
  }

  private loadConfig(configPath: string = DEFAULT_CONFIG_PATH): Configuration {
    const configuration = this.configurationService.load(configPath);
    return configuration;
  }

  private async runSubcommand(name: string) {
    const subcommand = this.commands.find((command) => command.name() === name);
    if (subcommand) {
      await subcommand.parseAsync(process.argv);
    }
  }
}
