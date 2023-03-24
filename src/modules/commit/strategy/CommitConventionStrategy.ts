export interface CommitConventionStrategy {
  getCommitMessage(): Promise<string>;
}

export enum CommitConventionStrategyType {
  CONVENTIONAL = "conventional",
  RED_GREEN_REFACTOR = "red-green-refactor",
}

export interface CommitConventionStrategyOptions {
  conventionalStrategy: CommitConventionStrategy;
  redGreenRefactorStrategy: CommitConventionStrategy;
}

export class CommitConventionStrategyFactory {
  static create(
    strategy: CommitConventionStrategyType,
    {
      conventionalStrategy,
      redGreenRefactorStrategy,
    }: CommitConventionStrategyOptions
  ): CommitConventionStrategy {
    switch (strategy) {
      case CommitConventionStrategyType.CONVENTIONAL:
        return conventionalStrategy;
      case CommitConventionStrategyType.RED_GREEN_REFACTOR:
        return redGreenRefactorStrategy;
      default:
        throw new Error(`Strategy ${strategy} not implemented`);
    }
  }
}
