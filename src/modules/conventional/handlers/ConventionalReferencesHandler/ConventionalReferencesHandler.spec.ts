import { ConfigurationManager } from "~/core/configuration";
import { PromptManager } from "~/core/prompt";
import { CommitBuilder } from "~/modules/commit";
import {
  ConventionalReferencesHandler,
  ABORT_MESSAGE,
} from "./ConventionalReferencesHandler";

describe("ConventionalReferencesHandler", () => {
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
  let sut: ConventionalReferencesHandler;

  beforeEach(() => {
    sut = new ConventionalReferencesHandler(
      mockPromptManager,
      mockConfigurationManager
    );
  });

  it("should ask for references if the commit type is a fix", async () => {
    const commitBuilder = mockCommitBuilder;
    commitBuilder.getType.mockReturnValue({
      message: "fix",
    });
    jest.spyOn(mockPromptManager, "confirm").mockResolvedValueOnce(true);
    jest.spyOn(mockPromptManager, "text").mockResolvedValueOnce("references");
    jest.spyOn(mockPromptManager, "confirm").mockResolvedValueOnce(false);

    await sut.handle(commitBuilder);

    expect(mockPromptManager.confirm).toHaveBeenCalledWith({
      defaultValue: false,
      message: "Does this commit reference any open issues?",
      abortMessage: ABORT_MESSAGE,
    });

    expect(mockPromptManager.text).toHaveBeenCalledWith({
      message: "Please enter a reference number:",
      placeholder: "e.g., #123 or 123",
      abortMessage: ABORT_MESSAGE,
    });

    expect(mockPromptManager.confirm).toHaveBeenCalledWith({
      defaultValue: false,
      message: "Does this commit affect any other open issues?",
      abortMessage: ABORT_MESSAGE,
    });

    expect(commitBuilder.withReferences).toHaveBeenCalledWith({
      message: "#references",
    });
  });

  it("should not ask for references if the commit type is not a fix", async () => {
    const commitBuilder = mockCommitBuilder;
    commitBuilder.getType.mockReturnValue({
      message: "feat",
    });

    await sut.handle(commitBuilder);

    expect(mockPromptManager.confirm).not.toHaveBeenCalled();
  });

  it("should add references to the commit if the user confirms", async () => {
    const commitBuilder = mockCommitBuilder;
    commitBuilder.getType.mockReturnValue({
      message: "fix",
    });
    jest.spyOn(mockPromptManager, "confirm").mockResolvedValueOnce(true);
    jest.spyOn(mockPromptManager, "text").mockResolvedValueOnce("references");
    jest.spyOn(mockPromptManager, "confirm").mockResolvedValueOnce(true);
    jest.spyOn(mockPromptManager, "text").mockResolvedValueOnce("references2");
    jest.spyOn(mockPromptManager, "confirm").mockResolvedValueOnce(false);

    await sut.handle(commitBuilder);

    expect(commitBuilder.withReferences).toHaveBeenCalledWith({
      message: "#references, #references2",
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
