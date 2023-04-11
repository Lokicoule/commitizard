import { Command } from "commandzen";
import { PromptAdapterFactory } from "~/adapters/prompt";
import {
  ConfigurationManagerFactory,
  ConfigurationService,
  ConfigurationServiceFactory,
  DEFAULT_CONFIG_PATH,
} from "~/core/configuration";
import { GitManagerFactory } from "~/core/git";
import { PromptManagerFactory } from "~/core/prompt";
import { CommitConventionStrategyType } from "~/modules/commit";
import { ConventionalStrategy } from "~/modules/conventional";
import { RedGreenRefactorStrategy } from "~/modules/red-green-refactor";
import { WizardCommitHandlerChainBuilder } from "./handlers/builder/WizardCommitHandlerChainBuilder";
import { WizardBuilderFactory } from "./builder";

export class WizardCommand {
  private constructor(private configurationService: ConfigurationService) {}

  public static create(
    configurationService: ConfigurationService = ConfigurationServiceFactory.create()
  ): Command {
    const wizardCommand = new WizardCommand(configurationService);
    return wizardCommand.buildCommand();
  }

  private buildCommand(): Command {
    return Command.create({
      name: "wizard",
      description: "A CLI tool for generating commit messages",
    })
      .addOption({
        flag: "-p, --path <path>",
        description: "Path to the configuration file",
        defaultValue: DEFAULT_CONFIG_PATH,
      })
      .addOption({
        flag: "-D, --display-staged-files",
        description: "Display staged files before prompting for commit message",
      })
      .addOption({
        flag: "-S, --select-files",
        description:
          "Prompt user to select files to stage before prompting for commit message",
      })
      .addOption({
        flag: "-s, --strategy",
        description: "Commit message strategy to use",
      })
      .addOption({
        flag: "-e, --with-emoji",
        description:
          "Use a relevant emoji as a prefix for the commit message type.",
      })
      .addOption({
        flag: "--from-hook",
        description: "Indicates that the command was called from a git hook",
      })
      .registerAction<{
        path: string;
        displayStagedFiles: boolean;
        selectFiles: boolean;
        strategy: CommitConventionStrategyType;
        withEmoji: boolean;
        fromHook: boolean;
      }>(async (options) => this.handleAction(options));
  }

  private async handleAction(options: {
    path: string;
    displayStagedFiles: boolean;
    selectFiles: boolean;
    strategy: CommitConventionStrategyType;
    withEmoji: boolean;
    fromHook: boolean;
  }): Promise<void> {
    const { path, displayStagedFiles, selectFiles, strategy, withEmoji } =
      options;

    const configuration = this.configurationService.load(path, withEmoji);
    const configurationManager =
      ConfigurationManagerFactory.create(configuration);

    const gitManager = GitManagerFactory.create({
      exclude: configurationManager.getExcludePaths(),
      fromHook: options.fromHook,
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
      WizardBuilderFactory.create()
    );
  }
}
