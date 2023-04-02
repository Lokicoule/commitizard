import { Command, Argument, Option, ParsedOptions } from "commandzen";
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
import { WizardCommitBuilderFactory } from "../builder/WizardCommitBuilderFactory";
import { WizardCommitHandlerChainBuilder } from "../handlers/WizardCommitHandlerBuilder";

type Options = {
  config: string;
  "display-staged-files": boolean;
  "select-files": boolean;
  strategy: CommitConventionStrategyType;
  "with-emoji": boolean;
};

export class WizardCommand extends Command {
  constructor(private readonly configurationService: ConfigurationService) {
    super({
      name: "wizard",
      description: "A CLI tool for generating commit messages",
    });
    this.configureOptions();
    this.configureAction();
  }

  private configureOptions(): void {
    this.options = [
      Option.create({
        shortName: "-p",
        longName: "--path",
        description: "Path to the configuration file",
        argument: Argument.create({
          type: "string",
          defaultValue: DEFAULT_CONFIG_PATH,
        }),
      }),
      Option.create({
        shortName: "-D",
        longName: "--display-staged-files",
        description: "Display staged files before prompting for commit message",
      }),
      Option.create({
        shortName: "-S",
        longName: "--select-files",
        description:
          "Prompt user to select files to stage before prompting for commit message",
      }),
      Option.create({
        shortName: "-s",
        longName: "--strategy",
        description: "Commit message strategy to use",
        argument: Argument.create({
          type: "string",
        }),
      }),
      Option.create({
        shortName: "-e",
        longName: "--with-emoji",
        description:
          "Use a relevant emoji as a prefix for the commit message type.",
        argument: Argument.create({
          type: "boolean",
          defaultValue: false,
        }),
      }),
    ];
  }

  private configureAction(): void {
    this.action = async (options: ParsedOptions) => {
      const {
        config,
        "display-staged-files": displayStagedFiles,
        "select-files": selectFiles,
        strategy,
        "with-emoji": withEmoji,
      } = options as Options;

      const configuration = this.configurationService.load(config, withEmoji);
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
    };
  }
}
