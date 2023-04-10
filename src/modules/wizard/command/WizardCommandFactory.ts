import { Command } from "commandzen";
import { FilesystemAdapterFactory } from "~/adapters/filesystem";
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
import { WizardBuilderFactory } from "../builder/WizardBuilderFactory";
import { WizardCommitHandlerChainBuilder } from "../handlers/builder/WizardCommitHandlerChainBuilder";

export const wizardCommandFactory = (
  configurationService: ConfigurationService = ConfigurationServiceFactory.create(
    FilesystemAdapterFactory.createLocalFilesystemAdapter()
  )
) => {
  return Command.create({
    name: "wizard",
    description: "A CLI tool for generating commit messages",
  })
    .addOption(
      {
        flag: "-p, --path <path>",
        description: "Path to the configuration file",
        defaultValue: DEFAULT_CONFIG_PATH,
      },
      {
        flag: "-D, --display-staged-files",
        description: "Display staged files before prompting for commit message",
      },
      {
        flag: "-S, --select-files",
        description:
          "Prompt user to select files to stage before prompting for commit message",
      },
      {
        flag: "-s, --strategy",
        description: "Commit message strategy to use",
      },
      {
        flag: "-e, --with-emoji",
        description:
          "Use a relevant emoji as a prefix for the commit message type.",
      },
      {
        flag: "--from-hook",
        description: "Indicates that the command was called from a git hook",
      }
    )
    .registerAction<{
      path: string;
      displayStagedFiles: boolean;
      selectFiles: boolean;
      strategy: CommitConventionStrategyType;
      withEmoji: boolean;
      fromHook: boolean;
    }>(async (options) => {
      const { path, displayStagedFiles, selectFiles, strategy, withEmoji } =
        options;

      const configuration = configurationService.load(path, withEmoji);
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
    });
};
