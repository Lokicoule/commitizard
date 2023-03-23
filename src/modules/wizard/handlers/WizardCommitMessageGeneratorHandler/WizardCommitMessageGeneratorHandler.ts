import { CliOptions } from "~/core/configuration";
import {
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
      promptManager: this.promptManager,
      configurationManager: this.configurationManager,
      gitManager: this.gitManager,
    });

    const message = await strategy.getCommitMessage();

    commitBuilder.withMessage(message);
  }
}
