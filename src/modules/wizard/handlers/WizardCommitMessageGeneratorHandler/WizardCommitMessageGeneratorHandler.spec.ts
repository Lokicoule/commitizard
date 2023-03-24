import { ConfigurationManager } from "~/core/configuration";
import { GitManager } from "~/core/git";
import { PromptManager } from "~/core/prompt";
import {
  CommitConventionStrategy,
  CommitConventionStrategyType,
} from "~/modules/commit/strategy/CommitConventionStrategy";
import { WizardCommitBuilder } from "../../builder/WizardCommit";
import { WizardCommitMessageGeneratorHandler } from "./WizardCommitMessageGeneratorHandler";

describe("WizardCommitMessageGeneratorHandler", () => {
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

  const mockConventionalStrategy = {
    getCommitMessage: jest
      .fn()
      .mockReturnValue("Test commit message - conventional"),
  } satisfies CommitConventionStrategy;

  const mockRedGreenRefactorStrategy = {
    getCommitMessage: jest
      .fn()
      .mockReturnValue("Test commit message - red green refactor"),
  } satisfies CommitConventionStrategy;

  // System under test
  let sut: WizardCommitMessageGeneratorHandler;

  beforeEach(() => {
    sut = new WizardCommitMessageGeneratorHandler(
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

  describe("handle", () => {
    it("should generate a commit message using the conventional convention", async () => {
      const commitMessage = "Test commit message - conventional";
      const convention = CommitConventionStrategyType.CONVENTIONAL;
      const mockCommitBuilder = {
        withMessage: jest.fn(),
        build: jest.fn(),
      } satisfies WizardCommitBuilder;

      mockPromptManager.select.mockResolvedValue(convention);

      await sut.handle(mockCommitBuilder);

      expect(mockPromptManager.select).toHaveBeenCalledWith({
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
      });

      expect(mockConventionalStrategy.getCommitMessage).toHaveBeenCalled();
      expect(
        mockRedGreenRefactorStrategy.getCommitMessage
      ).not.toHaveBeenCalled();
      expect(mockCommitBuilder.withMessage).toHaveBeenCalledWith(commitMessage);
    });
  });

  it("should generate a commit message using the red green refactor convention", async () => {
    const commitMessage = "Test commit message - red green refactor";
    const convention = CommitConventionStrategyType.RED_GREEN_REFACTOR;
    const mockCommitBuilder = {
      withMessage: jest.fn(),
      build: jest.fn(),
    } satisfies WizardCommitBuilder;

    mockPromptManager.select.mockResolvedValue(convention);

    await sut.handle(mockCommitBuilder);

    expect(mockPromptManager.select).toHaveBeenCalledWith({
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
    });

    expect(mockRedGreenRefactorStrategy.getCommitMessage).toHaveBeenCalled();
    expect(mockConventionalStrategy.getCommitMessage).not.toHaveBeenCalled();
    expect(mockCommitBuilder.withMessage).toHaveBeenCalledWith(commitMessage);
  });
});
