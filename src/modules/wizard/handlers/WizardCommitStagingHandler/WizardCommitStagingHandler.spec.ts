import { ConfigurationManager } from "~/core/configuration";
import { GitManager } from "~/core/git";
import { PromptManager } from "~/core/prompt";
import { CommitConventionStrategy } from "~/modules/commit/strategy/CommitConventionStrategy";
import { WizardCommitBuilder } from "../../builder/WizardCommit";
import { WizardCommitStagingHandler } from "./WizardCommitStagingHandler";

describe("WizardCommitStagingHandler", () => {
  const mockConfigurationManager = {
    getVersion: jest.fn(),
    getWizardMaxViewFilesToShow: jest.fn(),
    getConventionalCommitTemplate: jest.fn(),
    getConventionalCommitTemplateOrder: jest.fn(),
    getConventionalCliOptionsTypes: jest.fn(),
    getConventionalCliOptionsScopes: jest.fn(),
    getRedGreenRefactorCommitTemplate: jest.fn(),
    getRedGreenRefactorCommitTemplateOrder: jest.fn(),
    getRedGreenRefactorCliOptionsTypes: jest.fn(),
    selectorRedGreenRefactorCliOptionsTypes: jest.fn(),
    getExcludePaths: jest.fn(),
  } satisfies ConfigurationManager;

  const mockPromptManager = {
    confirm: jest.fn(),
    multiText: jest.fn(),
    text: jest.fn(),
    intro: jest.fn(),
    outro: jest.fn(),
    multiSelect: jest.fn(),
    select: jest.fn(),
    log: {
      info: jest.fn(),
      error: jest.fn(),
      success: jest.fn(),
      warn: jest.fn(),
    },
  } satisfies PromptManager;

  const mockGitManager = {
    stageFiles: jest.fn(),
    commit: jest.fn(),
    getStagedFiles: jest.fn(),
    getCreatedFiles: jest.fn(),
    getUpdatedFiles: jest.fn(),
    isGitRepository: jest.fn(),
    hasStagedFiles: jest.fn(),
    runGitCommand: jest.fn(),
  } satisfies GitManager;

  const mockWizardCommitBuilder = {
    withMessage: jest.fn(),
    build: jest.fn(),
  } satisfies WizardCommitBuilder;

  const mockConventionalStrategy = {
    getCommitMessage: jest.fn(),
  } satisfies CommitConventionStrategy;

  const mockRedGreenRefactorStrategy = {
    getCommitMessage: jest.fn(),
  } satisfies CommitConventionStrategy;

  // System under test
  let sut: WizardCommitStagingHandler;

  beforeEach(() => {
    sut = new WizardCommitStagingHandler(
      mockPromptManager,
      mockConfigurationManager,
      mockGitManager,
      mockConventionalStrategy,
      mockRedGreenRefactorStrategy
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  