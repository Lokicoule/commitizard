import { ConfigurationManager } from "~/core/configuration";
import { PromptManager } from "~/core/prompt";
import { CommitBuilder } from "~/modules/commit";
import { RedGreenRefactorTypeHandler } from "./RedGreenRefactorTypeHandler";

describe("RedGreenRefactorTypeHandler", () => {
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
  let sut: RedGreenRefactorTypeHandler;

  beforeEach(() => {
    sut = new RedGreenRefactorTypeHandler(
      mockPromptManager,
      mockConfigurationManager
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("handle", () => {
    it("should throw an error if configuration types are not defined", async () => {
      mockConfigurationManager.getRedGreenRefactorCliOptionsTypes.mockReturnValue(
        undefined
      );
      await expect(sut.handle(mockCommitBuilder)).rejects.toThrowError(
        "No red-green-refactor commit types defined in configuration!"
      );
    });

    it("should return the commit with the type", async () => {
      const types = ["RED", "GREEN", "REFACTOR"];

      jest
        .spyOn(mockConfigurationManager, "getRedGreenRefactorCliOptionsTypes")
        .mockReturnValue(types);
      jest.spyOn(mockPromptManager, "select").mockResolvedValue("GREEN");

      await sut.handle(mockCommitBuilder);

      expect(mockCommitBuilder.withType).toBeCalledWith({
        message: "GREEN",
      });
    });
  });
});
