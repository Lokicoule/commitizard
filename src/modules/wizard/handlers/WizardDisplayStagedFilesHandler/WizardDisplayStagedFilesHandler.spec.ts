import { ConfigurationManager } from "~/core/configuration";
import { GitManager } from "~/core/git";
import { PromptManager } from "~/core/prompt";
import { WizardCommitBuilder } from "../../builder/WizardCommitBuilder";
import { WizardDisplayStagedFilesHandler } from "./WizardDisplayStagedFilesHandler";

describe("WizardDisplayStagedFilesHandler", () => {
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
    runGitCommand: jest.fn(),
    writeToCommitMsgFile: jest.fn(),
  } satisfies GitManager;

  const mockWizardCommitBuilder = {
    withMessage: jest.fn(),
    withFiles: jest.fn(),
    build: jest.fn(),
  } satisfies WizardCommitBuilder;

  // System under test
  let sut: WizardDisplayStagedFilesHandler;

  beforeEach(() => {
    sut = new WizardDisplayStagedFilesHandler(
      mockPromptManager,
      mockConfigurationManager,
      mockGitManager
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("handle", () => {
    it("should display staged files in pages when there are files", async () => {
      // Arrange
      const files = [
        "file1.txt",
        "file2.txt",
        "file3.txt",
        "file4.txt",
        "file5.txt",
        "file6.txt",
      ];
      const getStagedFilesMock = jest
        .spyOn(mockGitManager, "getStagedFiles")
        .mockResolvedValue(files);
      const logInfoMock = jest.spyOn(mockPromptManager.log, "info");
      mockConfigurationManager.getWizardMaxViewFilesToShow.mockReturnValue(4);
      mockPromptManager.confirm.mockResolvedValue(true);

      await sut.handle(mockWizardCommitBuilder);

      expect(getStagedFilesMock).toHaveBeenCalled();
      expect(logInfoMock).toHaveBeenCalledWith(
        "Staged files [Page 1/2]: (max 4 files per page)"
      );
      expect(logInfoMock).toHaveBeenCalledWith(" file1.txt");
      expect(logInfoMock).toHaveBeenCalledWith(" file2.txt");
      expect(logInfoMock).toHaveBeenCalledWith(" file3.txt");
      expect(logInfoMock).toHaveBeenCalledWith(" file4.txt");
      expect(logInfoMock).toHaveBeenCalledWith(
        "Staged files [Page 2/2]: (max 4 files per page)"
      );
      expect(logInfoMock).toHaveBeenCalledWith(" file5.txt");
      expect(logInfoMock).toHaveBeenCalledWith(" file6.txt");
    });

    it("should log warning and return when there are no staged files", async () => {
      // Arrange
      const getStagedFilesMock = jest
        .spyOn(mockGitManager, "getStagedFiles")
        .mockResolvedValue([]);
      const logWarnMock = jest.spyOn(mockPromptManager.log, "warn");

      await sut.handle(mockWizardCommitBuilder);

      expect(getStagedFilesMock).toHaveBeenCalled();
      expect(logWarnMock).toHaveBeenCalledWith(
        "You don't have any staged files."
      );
    });

    it("should display all staged files on one page when there are fewer than max view files", async () => {
      const files = ["file1.txt", "file2.txt", "file3.txt"];
      const getStagedFilesMock = jest
        .spyOn(mockGitManager, "getStagedFiles")
        .mockResolvedValue(files);
      const logInfoMock = jest.spyOn(mockPromptManager.log, "info");
      mockConfigurationManager.getWizardMaxViewFilesToShow.mockReturnValue(3);

      await sut.handle(mockWizardCommitBuilder);

      expect(getStagedFilesMock).toHaveBeenCalled();
      expect(logInfoMock).toHaveBeenCalledWith(
        "Staged files [Page 1/1]: (max 3 files per page)"
      );
      expect(logInfoMock).toHaveBeenCalledWith(" file1.txt");
      expect(logInfoMock).toHaveBeenCalledWith(" file2.txt");
      expect(logInfoMock).toHaveBeenCalledWith(" file3.txt");
    });

    it("should break when should show more is false", async () => {
      const files = [
        "file1.txt",
        "file2.txt",
        "file3.txt",
        "file4.txt",
        "file5.txt",
        "file6.txt",
      ];
      const getStagedFilesMock = jest
        .spyOn(mockGitManager, "getStagedFiles")
        .mockResolvedValue(files);
      const logInfoMock = jest.spyOn(mockPromptManager.log, "info");
      mockConfigurationManager.getWizardMaxViewFilesToShow.mockReturnValue(4);
      mockPromptManager.confirm.mockResolvedValue(false);

      await sut.handle(mockWizardCommitBuilder);

      expect(getStagedFilesMock).toHaveBeenCalled();
      expect(logInfoMock).toHaveBeenCalledWith(
        "Staged files [Page 1/2]: (max 4 files per page)"
      );
      expect(logInfoMock).toHaveBeenCalledWith(" file1.txt");
      expect(logInfoMock).toHaveBeenCalledWith(" file2.txt");
      expect(logInfoMock).toHaveBeenCalledWith(" file3.txt");
      expect(logInfoMock).toHaveBeenCalledWith(" file4.txt");
      expect(logInfoMock).not.toHaveBeenCalledWith(
        "Staged files [Page 2/2]: (max 4 files per page)"
      );
      expect(logInfoMock).not.toHaveBeenCalledWith(" file5.txt");
      expect(logInfoMock).not.toHaveBeenCalledWith(" file6.txt");
    });
  });
});
