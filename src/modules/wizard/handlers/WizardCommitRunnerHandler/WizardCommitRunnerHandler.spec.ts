import { ConfigurationManager } from "~/core/configuration";
import { GitManager } from "~/core/git";
import { PromptManager } from "~/core/prompt";
import { WizardBuilder } from "~/modules/wizard/builder";
import { WizardCommitRunnerHandler } from "~/modules/wizard/handlers/WizardCommitRunnerHandler/WizardCommitRunnerHandler";

describe("WizardCommitRunnerHandler", () => {
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
    multiSelectPaginate: jest.fn(),
  } satisfies PromptManager;

  const mockGitManager = {
    stageFiles: jest.fn(),
    commit: jest.fn(),
    getStagedFiles: jest.fn(),
    getCreatedFiles: jest.fn(),
    getUpdatedFiles: jest.fn(),
    isGitRepository: jest.fn(),
    hasStagedFiles: jest.fn(),
    getDeletedFiles: jest.fn(),
  } satisfies GitManager;

  const mockWizardBuilder = {
    withMessage: jest.fn(),
    withFiles: jest.fn(),
    build: jest.fn(),
  } satisfies WizardBuilder;

  // System under test
  let sut: WizardCommitRunnerHandler;

  beforeEach(() => {
    sut = new WizardCommitRunnerHandler(
      mockPromptManager,
      mockConfigurationManager,
      mockGitManager
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("handle", () => {
    it("should display an error message if not inside a git repository", async () => {
      mockGitManager.isGitRepository.mockResolvedValue(false);

      await sut.handle(mockWizardBuilder);

      expect(mockPromptManager.log.error).toHaveBeenCalledWith(
        expect.stringContaining("You are not inside a git repository!")
      );
      expect(mockPromptManager.outro).toHaveBeenCalledWith({
        message: expect.stringContaining("Commit creation aborted!"),
      });
    });

    it("should display an error message if there are no staged files", async () => {
      mockGitManager.isGitRepository.mockResolvedValue(true);
      mockGitManager.hasStagedFiles.mockResolvedValue(false);
      mockWizardBuilder.build.mockReturnValue({
        message: "",
        files: [],
      });

      await sut.handle(mockWizardBuilder);

      expect(mockPromptManager.log.error).toHaveBeenCalledWith(
        expect.stringContaining("You have no staged files!")
      );
      expect(mockPromptManager.outro).toHaveBeenCalledWith({
        message: expect.stringContaining("Commit creation aborted!"),
      });
    });

    it("should display a success message when git manager has staged files is true", async () => {
      const commitMessage = "Test commit";
      mockGitManager.isGitRepository.mockResolvedValue(true);
      mockGitManager.hasStagedFiles.mockResolvedValue(true);
      mockWizardBuilder.build.mockReturnValue({
        message: commitMessage,
        files: [],
      });

      await sut.handle(mockWizardBuilder);

      expect(mockGitManager.commit).toHaveBeenCalledWith(commitMessage);
      expect(mockPromptManager.outro).toHaveBeenCalledWith({
        message: expect.stringContaining("Commit created successfully!"),
      });
    });

    it("should display a success message when builder contains files", async () => {
      const commitMessage = "Test commit";
      const files = ["file1", "file2"];
      mockGitManager.isGitRepository.mockResolvedValue(true);
      mockGitManager.hasStagedFiles.mockResolvedValue(false);
      mockWizardBuilder.build.mockReturnValue({
        message: commitMessage,
        files,
      });

      await sut.handle(mockWizardBuilder);

      expect(mockGitManager.stageFiles).toHaveBeenCalledWith(files);
      expect(mockGitManager.commit).toHaveBeenCalledWith(commitMessage);
      expect(mockPromptManager.outro).toHaveBeenCalledWith({
        message: expect.stringContaining("Commit created successfully!"),
      });
    });

    it("should display an error message if an error occurs while creating the commit", async () => {
      const errorMessage = "An error occurred while creating the commit";
      mockGitManager.isGitRepository.mockResolvedValue(true);
      mockGitManager.hasStagedFiles.mockResolvedValue(true);
      mockGitManager.commit.mockRejectedValue(new Error(errorMessage));

      await sut.handle(mockWizardBuilder);

      expect(mockPromptManager.outro).toHaveBeenCalledWith({
        message: expect.stringContaining(
          "An error occurred while creating the commit!"
        ),
      });
    });

    it("should display an error message if an error occurs while staging the files", async () => {
      const errorMessage = "An error occurred while staging the files";
      const files = ["file1", "file2"];
      mockGitManager.isGitRepository.mockResolvedValue(true);
      mockGitManager.hasStagedFiles.mockResolvedValue(false);
      mockGitManager.stageFiles.mockRejectedValue(new Error(errorMessage));
      mockWizardBuilder.build.mockReturnValue({
        message: "",
        files,
      });

      await sut.handle(mockWizardBuilder);

      expect(mockPromptManager.outro).toHaveBeenCalledWith({
        message: expect.stringContaining(
          "An error occurred while staging the files"
        ),
      });
    });
  });
});
