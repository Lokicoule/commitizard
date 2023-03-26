import { ConfigurationManager } from "~/core/configuration";
import { GitManager } from "~/core/git";
import { PromptManager } from "~/core/prompt";
import { CommitConventionStrategy } from "~/modules/commit/strategy/CommitConventionStrategy";
import { WizardCommitHandlerChainBuilder } from "./WizardCommitHandlerBuilder";
import { WizardDisplayStagedFilesHandler } from "./WizardDisplayStagedFilesHandler/WizardDisplayStagedFilesHandler";

describe("WizardCommitHandlerChainBuilder", () => {
  let promptManager: PromptManager;
  let configurationManager: ConfigurationManager;
  let gitManager: GitManager;
  let conventionalStrategy: CommitConventionStrategy;
  let redGreenRefactorStrategy: CommitConventionStrategy;

  beforeEach(() => {
    promptManager = jest.fn() as any;
    configurationManager = jest.fn() as any;
    gitManager = jest.fn() as any;
    conventionalStrategy = jest.fn() as any;
    redGreenRefactorStrategy = jest.fn() as any;
  });

  describe("build", () => {
    it("should build a chain of handlers", () => {
      const builder = new WizardCommitHandlerChainBuilder(
        promptManager,
        configurationManager,
        gitManager,
        conventionalStrategy,
        redGreenRefactorStrategy
      );

      const handler = builder
        .withDisplayStagedFilesHandler(true)
        .withCommitFileSelectionHandler(true)
        .withCommitMessageGeneratorHandler()
        .withCommitConfirmationHandler()
        .withCommitRunnerHandler()
        .build();

      expect(handler).toBeDefined();
      expect(handler).toBeInstanceOf(WizardDisplayStagedFilesHandler);
    });
  });

  describe("buildAndExecute", () => {
    it("should build a chain of handlers and execute it and throw an error because the mocks are not implemented", async () => {
      const builder = new WizardCommitHandlerChainBuilder(
        promptManager,
        configurationManager,
        gitManager,
        conventionalStrategy,
        redGreenRefactorStrategy
      );

      const handler = builder
        .withDisplayStagedFilesHandler(true)
        .withCommitFileSelectionHandler(true)
        .withCommitMessageGeneratorHandler()
        .withCommitConfirmationHandler()
        .withCommitRunnerHandler()
        .buildAndExecute({} as any);

      await expect(handler).rejects.toThrowError();
    });
  });
});
