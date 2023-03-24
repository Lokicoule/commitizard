import { ConfigurationManager } from "~/core/configuration";
import { GitManager } from "~/core/git";
import { PromptManager } from "~/core/prompt";
import { ConventionalStrategy } from "~/modules/conventional/strategy/ConventionalStrategy";
import { RedGreenRefactorStrategy } from "~/modules/red-green-refactor/strategy/RedGreenRefactorStrategy";

export interface CommitConventionStrategy {
  getCommitMessage(): Promise<string>;
}

export enum CommitConventionStrategyType {
  CONVENTIONAL = "conventional",
  RED_GREEN_REFACTOR = "red-green-refactor",
}

export interface CommitConventionStrategyOptions {
  promptManager: PromptManager;
  configurationManager: ConfigurationManager;
  gitManager: GitManager;
}

export class CommitConventionStrategyFactory {
  static create(
    strategy: CommitConventionStrategyType,
    options: CommitConventionStrategyOptions
  ): CommitConventionStrategy {
    switch (strategy) {
      case CommitConventionStrategyType.CONVENTIONAL:
        return new ConventionalStrategy(options);
      case CommitConventionStrategyType.RED_GREEN_REFACTOR:
        return new RedGreenRefactorStrategy(options);
      default:
        throw new Error(`Strategy ${strategy} not implemented`);
    }
  }
}
