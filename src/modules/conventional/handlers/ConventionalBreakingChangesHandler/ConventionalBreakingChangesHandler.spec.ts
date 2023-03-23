import { ConfigurationManager } from "~/core/configuration";
import { PromptManager } from "~/core/prompt";
import { CommitBuilder } from "~/modules/commit";
import {
  ConventionalBreakingChangesHandler,
  ABORT_MESSAGE,
} from "./ConventionalBreakingChangesHandler";

describe("ConventionalBreakingChangesHandler", () => {
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
    withBreakingChanges: jest.fn(),
  };

  // System under test
  let sut: ConventionalBreakingChangesHandler;

  beforeEach(() => {
    sut = new ConventionalBreakingChangesHandler(
      mockPromptManager,
      configurationManager
    );
  });

  describe("processInput", () => {
    it("should ask for a breaking changes if the user wants one", async () => {
      jest.spyOn(mockPromptManager, "confirm").mockResolvedValueOnce(true);
      jest
        .spyOn(mockPromptManager, "multiText")
        .mockResolvedValueOnce(["breaking changes line"]);

      await sut.handle(mockCommitBuilder as unknown as CommitBuilder);

      expect(mockPromptManager.confirm).toHaveBeenCalledWith({
        defaultValue: false,
        message: "Does this commit have a breaking change?",
        abortMessage: ABORT_MESSAGE,
      });

      expect(mockPromptManager.multiText).toHaveBeenCalledWith({
        confirm: {
          message: "Do you need another breaking change line?",
          abortMessage: ABORT_MESSAGE,
        },
        text: {
          message: "Please enter a breaking change line:",
          abortMessage: ABORT_MESSAGE,
        },
      });

      expect(mockCommitBuilder.withBreakingChanges).toHaveBeenCalledWith({
        message: "breaking changes line",
      });
    });

    it("should not ask for a breaking changes if the user does not want one", async () => {
      jest.spyOn(mockPromptManager, "confirm").mockResolvedValueOnce(false);

      await sut.handle(mockCommitBuilder as unknown as CommitBuilder);

      expect(mockPromptManager.confirm).toHaveBeenCalledWith({
        defaultValue: false,
        message: "Does this commit have a breaking change?",
        abortMessage: ABORT_MESSAGE,
      });

      expect(mockPromptManager.multiText).not.toHaveBeenCalled();

      expect(mockCommitBuilder.withBreakingChanges).toHaveBeenCalledWith({
        message: "",
      });
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
