import { ConventionalStrategy } from "~/modules/conventional/strategy/ConventionalStrategy";
import { RedGreenRefactorStrategy } from "~/modules/red-green-refactor/strategy/RedGreenRefactorStrategy";
import {
  CommitConventionStrategyFactory,
  CommitConventionStrategyType,
} from "./CommitConventionStrategy";

describe("CommitConventionStrategyFactory", () => {
  it("should create a conventional strategy", () => {
    const strategy = CommitConventionStrategyFactory.create(
      CommitConventionStrategyType.CONVENTIONAL,
      {
        conventionalStrategy: new ConventionalStrategy({} as any, {} as any),
        redGreenRefactorStrategy: new RedGreenRefactorStrategy(
          {} as any,
          {} as any
        ),
      }
    );

    expect(strategy).toBeInstanceOf(ConventionalStrategy);
  });

  it("should create a red-green-refactor strategy", () => {
    const strategy = CommitConventionStrategyFactory.create(
      CommitConventionStrategyType.RED_GREEN_REFACTOR,
      {
        conventionalStrategy: new ConventionalStrategy({} as any, {} as any),
        redGreenRefactorStrategy: new RedGreenRefactorStrategy(
          {} as any,
          {} as any
        ),
      }
    );

    expect(strategy).toBeInstanceOf(RedGreenRefactorStrategy);
  });

  it("should throw an error if the strategy is not implemented", () => {
    expect(() =>
      CommitConventionStrategyFactory.create("not_implemented" as any, {
        conventionalStrategy: new ConventionalStrategy({} as any, {} as any),
        redGreenRefactorStrategy: new RedGreenRefactorStrategy(
          {} as any,
          {} as any
        ),
      })
    ).toThrowError("Strategy not_implemented not implemented");
  });
});
