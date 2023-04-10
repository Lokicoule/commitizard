import { ConfigurationManager } from "~/core/configuration";
import { PromptManager } from "~/core/prompt";
import { CommitBuilder } from "~/modules/commit";
import { ConventionalScopeHandler } from "./ConventionalScopeHandler";

describe("ConventionalScopeHandler", () => {
  const ABORT_MESSAGE = "Commit scope aborted!";
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
  let sut: ConventionalScopeHandler;

  beforeEach(() => {
    sut = new ConventionalScopeHandler(
      mockPromptManager,
      mockConfigurationManager
    );
  });

  it("should select commit scope", async () => {
    const scopes = [
      {
        value: "test",
        label: "test",
      },
    ];
    mockConfigurationManager.getConventionalCliOptionsScopes.mockReturnValue(
      scopes
    );
    mockPromptManager.select.mockResolvedValueOnce("test");

    await sut.handle(mockCommitBuilder);

    expect(mockPromptManager.select).toHaveBeenCalledWith({
      message: "Select commit scope:",
      options: scopes,
      abortMessage: ABORT_MESSAGE,
    });
    expect(mockCommitBuilder.withScope).toHaveBeenCalledWith({
      message: "test",
    });
  });

  it("should prompt commit scope", async () => {
    mockConfigurationManager.getConventionalCliOptionsScopes.mockReturnValue(
      []
    );
    mockPromptManager.text.mockResolvedValueOnce("test");

    await sut.handle(mockCommitBuilder);

    expect(mockPromptManager.text).toHaveBeenCalledWith({
      message: "Enter a scope for the commit (optional):",
      abortMessage: ABORT_MESSAGE,
    });
    expect(mockCommitBuilder.withScope).toHaveBeenCalledWith({
      message: "test",
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
