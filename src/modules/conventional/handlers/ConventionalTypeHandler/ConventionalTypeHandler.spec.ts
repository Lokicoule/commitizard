import { ConfigurationManager } from "~/core/configuration";
import { PromptManager } from "~/core/prompt";
import { CommitBuilder } from "~/modules/commit";
import { ConventionalTypeHandler } from "./ConventionalTypeHandler";

describe("ConventionalTypeHandler", () => {
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
  let sut: ConventionalTypeHandler;

  beforeEach(() => {
    sut = new ConventionalTypeHandler(
      mockPromptManager,
      mockConfigurationManager
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("handle", () => {
    it("should throw an error if configuration types are not defined", async () => {
      mockConfigurationManager.getConventionalCliOptionsTypes.mockReturnValue(
        []
      );
      await expect(sut.handle(mockCommitBuilder)).rejects.toThrowError(
        "No conventional commit types defined in configuration!"
      );
    });

    it("should return the commit with the type", async () => {
      const types = ["feat", "fix", "chore"];

      mockPromptManager.select.mockResolvedValue(types[1]);
      mockConfigurationManager.getConventionalCliOptionsTypes.mockReturnValue(
        types
      );
      await sut.handle(mockCommitBuilder);

      expect(mockCommitBuilder.withType).toBeCalledWith({
        message: types[1],
      });
    });
  });
});
