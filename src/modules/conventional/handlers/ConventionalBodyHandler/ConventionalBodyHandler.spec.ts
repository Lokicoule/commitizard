import { ConfigurationManager } from "~/core/configuration";
import { PromptManager } from "~/core/prompt";
import {
  ABORT_MESSAGE,
  ConventionalBodyHandler,
} from "./ConventionalBodyHandler";

describe("ConventionalBodyHandler", () => {
  // Mocks
  const configurationManager = {
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
  } as ConfigurationManager;

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
  } as PromptManager;

  const mockCommitBuilder = {
    withBody: jest.fn(),
  };

  // System under test
  let sut: ConventionalBodyHandler;

  beforeEach(() => {
    sut = new ConventionalBodyHandler(mockPromptManager, configurationManager);
  });

  describe("processInput", () => {
    it("should ask for a body if the user wants one", async () => {
      jest.spyOn(mockPromptManager, "confirm").mockResolvedValueOnce(true);
      jest
        .spyOn(mockPromptManager, "multiText")
        .mockResolvedValueOnce(["body line"]);

      await sut.handle(mockCommitBuilder as any);

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

      await sut.handle(mockCommitBuilder as any);

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
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
