import { ConfigurationManager } from "~/core/configuration";
import { PromptManager } from "~/core/prompt";
import { CommitBuilder } from "~/modules/commit";
import { ConventionalSubjectHandler } from "./ConventionalSubjectHandler";

describe("ConventionalSubjectHandler", () => {
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
  let sut: ConventionalSubjectHandler;

  beforeEach(() => {
    sut = new ConventionalSubjectHandler(
      mockPromptManager,
      mockConfigurationManager
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return the commit builder with the subject", async () => {
    const subject = "subject";
    mockPromptManager.text.mockResolvedValueOnce(subject);

    await sut.handle(mockCommitBuilder);

    expect(mockCommitBuilder.withSubject).toHaveBeenCalledWith({
      message: subject,
    });
  });

  it("should prompt the user to enter a commit subject and set it in the commit builder", async () => {
    const subject = "feat: add feature X";
    mockPromptManager.text.mockResolvedValueOnce(subject);

    await sut.handle(mockCommitBuilder);

    expect(mockPromptManager.text).toHaveBeenCalledWith({
      message: "Enter commit subject:",
      abortMessage: "Commit subject aborted!",
      validate: expect.any(Function),
    });

    expect(mockCommitBuilder.withSubject).toHaveBeenCalledWith({
      message: subject,
    });
  });

  it("should validate the commit subject", async () => {
    const commitSubjectHandler = new ConventionalSubjectHandler(
      mockPromptManager as unknown as PromptManager,
      mockConfigurationManager
    );

    (mockPromptManager.text as jest.Mock).mockImplementation((options) => {
      if (options.validate) {
        expect(options.validate("")).toBe("Subject is required!");
        expect(options.validate("A valid commit subject")).toBeUndefined();
      }
      return Promise.resolve("A valid commit subject");
    });

    await commitSubjectHandler.handle(mockCommitBuilder);

    expect(mockPromptManager.text).toHaveBeenCalled();
    expect(mockCommitBuilder.withSubject).toHaveBeenCalledWith({
      message: "A valid commit subject",
    });
  });

  it("subject message should be validated", async () => {
    const commitSubjectHandler = new ConventionalSubjectHandler(
      mockPromptManager as unknown as PromptManager,
      mockConfigurationManager
    );

    (mockPromptManager.text as jest.Mock).mockImplementation((options) => {
      if (options.validate) {
        expect(options.validate("")).toBe("Subject is required!");
        expect(options.validate("A valid commit subject")).toBeUndefined();
      }
      return Promise.resolve("A valid commit subject");
    });

    await commitSubjectHandler.handle(mockCommitBuilder);

    expect(mockPromptManager.text).toHaveBeenCalled();
    expect(mockCommitBuilder.withSubject).toHaveBeenCalledWith({
      message: "A valid commit subject",
    });
  });
});
