import { CliOptions, ConfigurationManager } from "~/core/configuration";
import { GitManager } from "~/core/git";
import { PromptManager } from "~/core/prompt";
import {
  CommitConventionStrategy,
  CommitConventionStrategyFactory,
  CommitConventionStrategyType,
} from "~/modules/commit/strategy/CommitConventionStrategy";
import { WizardCommitBuilder } from "../../builder/WizardCommit";
import { BaseWizardCommitHandler } from "../BaseWizardCommitHandler";

/**
 * @class WizardCommitMessageGeneratorHandler
 * @extends {BaseWizardCommitHandler}
 * @implements {WizardCommitHandler}
 * @description
 * This handler is responsible for generating the commit message.
 */
export class WizardCommitMessageGeneratorHandler extends BaseWizardCommitHandler {
  private readonly conventionalStrategy: CommitConventionStrategy;
  private readonly redGreenRefactorStrategy: CommitConventionStrategy;

  constructor(
    promptManager: PromptManager,
    configurationManager: ConfigurationManager,
    gitManager: GitManager,
    conventionalStrategy: CommitConventionStrategy,
    redGreenRefactorStrategy: CommitConventionStrategy
  ) {
    super(promptManager, configurationManager, gitManager);
    this.conventionalStrategy = conventionalStrategy;
    this.redGreenRefactorStrategy = redGreenRefactorStrategy;
  }

  protected async processInput(
    commitBuilder: WizardCommitBuilder
  ): Promise<void> {
    const convention = (await this.promptManager.select<CliOptions[], string>({
      message: "Which convention would you like to use?",
      options: [
        {
          value: CommitConventionStrategyType.CONVENTIONAL,
          label: "Conventional Commit (default)",
        },
        {
          value: CommitConventionStrategyType.RED_GREEN_REFACTOR,
          label: "Red-Green-Refactor Commit",
        },
      ],
      abortMessage: "Convention selection aborted!",
    })) as CommitConventionStrategyType;

    const strategy = CommitConventionStrategyFactory.create(convention, {
      conventionalStrategy: this.conventionalStrategy,
      redGreenRefactorStrategy: this.redGreenRefactorStrategy,
    });

    const message = await strategy.getCommitMessage();

    commitBuilder.withMessage(message);
  }
}
