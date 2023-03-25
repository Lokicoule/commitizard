import { ConfigurationManager } from "~/core/configuration";
import { PromptManager } from "~/core/prompt";
import { CommitBuilder } from "~/modules/commit";
import {
  ABORT_MESSAGE,
  ConventionalBodyHandler,
} from "./ConventionalBodyHandler";

describe("ConventionalBodyHandler", () => {
  // Mocks
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

  const mockCommitBuilder = {
    withReferences: jest.fn(),
    withBody: jest.fn(),
    build: jest.fn(),
    withType: jest.fn(),
    withScope: jest.fn(),
    withFooter: jest.fn(),
    withSubject: jest.fn(),
    getType: jest.fn(),
    withBreakingChanges: jest.fn(),
  } satisfies CommitBuilder;

  // System under test
  let sut: ConventionalBodyHandler;

  beforeEach(() => {
    sut = new ConventionalBodyHandler(
      mockPromptManager,
      mockConfigurationManager
    );
  });

  it("should ask for a body if the user wants one", async () => {
    jest.spyOn(mockPromptManager, "confirm").mockResolvedValueOnce(true);
    jest
      .spyOn(mockPromptManager, "multiText")
      .mockResolvedValueOnce(["body line"]);

    await sut.handle(mockCommitBuilder);

    expect(mockPromptManager.confirm).toHaveBeenCalledWith({
      defaultValue: false,
      message: "Does this commit have a body?",
      abortMessage: ABORT_MESSAGE,
    });
    expect(mockPromptManager.multiText).toHaveBeenCalledWith({
      text: {
        message: "Please enter a body line:",
        abortMessage: ABORT_MESSAGE,
      },
      confirm: {
        message: "Do you need another body line?",
        abortMessage: ABORT_MESSAGE,
      },
    });
    expect(mockCommitBuilder.withBody).toHaveBeenCalledWith({
      message: "body line",
    });
  });

  it("should not ask for a body if the user does not want one", async () => {
    jest.spyOn(mockPromptManager, "confirm").mockResolvedValueOnce(false);

    await sut.handle(mockCommitBuilder);

    expect(mockPromptManager.confirm).toHaveBeenCalledWith({
      defaultValue: false,
      message: "Does this commit have a body?",
      abortMessage: ABORT_MESSAGE,
    });
    expect(mockPromptManager.multiText).not.toHaveBeenCalled();
    expect(mockCommitBuilder.withBody).toHaveBeenCalledWith({
      message: "",
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
