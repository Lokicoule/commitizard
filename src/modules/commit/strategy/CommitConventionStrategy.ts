import { ConfigurationManager } from "~/core/configuration";
import { GitManager } from "~/core/git";
import { PromptManager } from "~/core/prompt";
import { ConventionalCommitConventionStrategy } from "~/modules/conventional/strategy/ConventionalStrategy";
import { RedGreenRefactorCommitConventionStrategy } from "~/modules/red-green-refactor/strategy/RedGreenRefactorStrategy";

export interface CommitConventionStrategy {
  getCommitMessage(): Promise<string>;
}

export enum CommitConventionStrategyType {
  CONVENTIONAL = "conventional",
  RED_GREEN_REFACTOR = "red-green-refactor",
}

export interface CommitConventionStrategyOptions {
  promptManager: PromptManager;
  configuration: ConfigurationManager;
  gitManager: GitManager;
}

export class CommitConventionStrategyFactory {
  static create(
    strategy: CommitConventionStrategyType,
    options: CommitConventionStrategyOptions
  ): CommitConventionStrategy {
    switch (strategy) {
      case CommitConventionStrategyType.CONVENTIONAL:
        return new ConventionalCommitConventionStrategy(options);
      case CommitConventionStrategyType.RED_GREEN_REFACTOR:
        return new RedGreenRefactorCommitConventionStrategy(options);
      default:
        throw new Error(`Strategy ${strategy} not implemented`);
    }
  }
}
