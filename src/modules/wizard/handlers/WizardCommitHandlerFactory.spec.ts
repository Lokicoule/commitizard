import { ConfigurationManager } from "~/core/configuration";
import { GitManager } from "~/core/git";
import { PromptManager } from "~/core/prompt";
import { CommitConventionStrategy } from "~/modules/commit/strategy/CommitConventionStrategy";
import { WizardCommitConfirmationHandler } from "./WizardCommitConfirmationHandler/WizardCommitConfirmationHandler";
import { WizardCommitFileSelectionHandler } from "./WizardCommitFileSelectionHandler/WizardCommitFileSelectionHandler";
import { WizardCommitHandlerFactory } from "./WizardCommitHandlerFactory";
import { WizardCommitMessageGeneratorHandler } from "./WizardCommitMessageGeneratorHandler/WizardCommitMessageGeneratorHandler";
import { WizardCommitRunnerHandler } from "./WizardCommitRunnerHandler/WizardCommitRunnerHandler";
import { WizardDisplayStagedFilesHandler } from "./WizardDisplayStagedFilesHandler/WizardDisplayStagedFilesHandler";

describe("WizardCommitHandlerFactory", () => {
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

  it("should create a WizardCommitConfirmationHandler", () => {
    const factory = new WizardCommitHandlerFactory(
      promptManager,
      configurationManager,
      gitManager,
      conventionalStrategy,
      redGreenRefactorStrategy
    );
    const handler = factory.createWizardCommitConfirmationHandler();
    expect(handler).toBeInstanceOf(WizardCommitConfirmationHandler);
  });

  it("should create a WizardCommitFileSelectionHandler", () => {
    const factory = new WizardCommitHandlerFactory(
      promptManager,
      configurationManager,
      gitManager,
      conventionalStrategy,
      redGreenRefactorStrategy
    );
    const handler = factory.createWizardCommitFileSelectionHandler();
    expect(handler).toBeInstanceOf(WizardCommitFileSelectionHandler);
  });

  it("should create a WizardCommitMessageGeneratorHandler", () => {
    const factory = new WizardCommitHandlerFactory(
      promptManager,
      configurationManager,
      gitManager,
      conventionalStrategy,
      redGreenRefactorStrategy
    );
    const handler = factory.createWizardCommitMessageGeneratorHandler();
    expect(handler).toBeInstanceOf(WizardCommitMessageGeneratorHandler);
  });

  it("should create a WizardCommitRunnerHandler", () => {
    const factory = new WizardCommitHandlerFactory(
      promptManager,
      configurationManager,
      gitManager,
      conventionalStrategy,
      redGreenRefactorStrategy
    );
    const handler = factory.createWizardCommitRunnerHandler();
    expect(handler).toBeInstanceOf(WizardCommitRunnerHandler);
  });

  it("should create a WizardDisplayStagedFilesHandler", () => {
    const factory = new WizardCommitHandlerFactory(
      promptManager,
      configurationManager,
      gitManager,
      conventionalStrategy,
      redGreenRefactorStrategy
    );
    const handler = factory.createWizardDisplayStagedFilesHandler();
    expect(handler).toBeInstanceOf(WizardDisplayStagedFilesHandler);
  });
});
