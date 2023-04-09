import { ConfigurationManager } from "~/core/configuration";
import { GitManager } from "~/core/git";
import { PromptManager } from "~/core/prompt";
import { WizardCommitBuilder } from "../../builder/WizardCommitBuilder";
import { WizardCommitFileSelectionHandler } from "./WizardCommitFileSelectionHandler";

describe("WizardCommitFileSelectionHandler", () => {
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
    runGitCommand: jest.fn(),
    getDeletedFiles: jest.fn(),
    writeToCommitMsgFile: jest.fn(),
  } satisfies GitManager;

  const mockWizardCommitBuilder = {
    withMessage: jest.fn(),
    withFiles: jest.fn(),
    build: jest.fn(),
  } satisfies WizardCommitBuilder;

  // System under test
  let sut: WizardCommitFileSelectionHandler;

  beforeEach(() => {
    sut = new WizardCommitFileSelectionHandler(
      mockPromptManager,
      mockConfigurationManager,
      mockGitManager
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("processInput", () => {
    it("should add files to the commit", async () => {
      mockGitManager.getUpdatedFiles.mockResolvedValue(["file1", "file2"]);
      mockGitManager.getCreatedFiles.mockResolvedValue(["file3", "file4"]);
      mockGitManager.getDeletedFiles.mockResolvedValue(["file5", "file6"]);

      mockPromptManager.multiSelectPaginate
        .mockResolvedValueOnce(["file1", "file2"])
        .mockResolvedValueOnce(["file3", "file4"])
        .mockResolvedValueOnce(["file5", "file6"]);

      await sut.handle(mockWizardCommitBuilder);

      expect(mockWizardCommitBuilder.withFiles).toHaveBeenCalledTimes(1);
      expect(mockWizardCommitBuilder.withFiles).toHaveBeenCalledWith([
        "file1",
        "file2",
        "file3",
        "file4",
        "file5",
        "file6",
      ]);
    });

    it("should not add files to the commit", async () => {
      mockGitManager.getUpdatedFiles.mockResolvedValue([]);
      mockGitManager.getCreatedFiles.mockResolvedValue([]);
      mockGitManager.getDeletedFiles.mockResolvedValue([]);

      await sut.handle(mockWizardCommitBuilder);

      expect(mockWizardCommitBuilder.withFiles).not.toHaveBeenCalled();
    });
  });
});
