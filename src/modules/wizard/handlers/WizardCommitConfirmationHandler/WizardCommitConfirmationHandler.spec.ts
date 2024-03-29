import { ConfigurationManager } from "~/core/configuration";
import { GitManager } from "~/core/git";
import { PromptManager } from "~/core/prompt";
import { WizardBuilder } from "../../builder";
import { WizardCommitConfirmationHandler } from "./WizardCommitConfirmationHandler";

describe("WizardCommitConfirmationHandler", () => {
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
  let sut: WizardCommitConfirmationHandler;

  beforeEach(() => {
    sut = new WizardCommitConfirmationHandler(
      mockPromptManager,
      mockConfigurationManager,
      mockGitManager
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should abort if user does not confirm", async () => {
    mockPromptManager.confirm.mockResolvedValueOnce(false);
    mockPromptManager.log.warn = jest.fn();
    mockWizardBuilder.build.mockReturnValueOnce({
      message: "message",
    });

    await sut.handle(mockWizardBuilder);

    expect(mockPromptManager.confirm).toBeCalled();
    expect(mockPromptManager.log.warn).toBeCalled();
  });

  it("should not abort if user confirms", async () => {
    mockPromptManager.confirm.mockResolvedValueOnce(true);
    mockWizardBuilder.build.mockReturnValueOnce({
      message: "message",
    });

    await sut.handle(mockWizardBuilder);

    expect(mockPromptManager.confirm).toBeCalled();
    expect(mockPromptManager.log.warn).not.toBeCalled();
  });
});
