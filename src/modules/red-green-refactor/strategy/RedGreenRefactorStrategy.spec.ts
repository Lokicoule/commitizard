import { ConfigurationManager } from "~/core/configuration";
import { PromptManager } from "~/core/prompt";
import { DEFAULT_COMMIT_SUBJECT } from "../handlers/RedGreenRefactorSubjectHandler/RedGreenRefactorSubjectHandler";
import { RedGreenRefactorStrategy } from "./RedGreenRefactorStrategy";

describe("RedGreenRefactorStrategy", () => {
  const mockConfigurationManager = {
    getVersion: jest.fn(),
    getWizardMaxViewFilesToShow: jest.fn(),
    getConventionalCommitTemplate: jest.fn(),
    getConventionalCommitTemplateOrder: jest.fn(),
    getConventionalCliOptionsTypes: jest.fn(),
    getConventionalCliOptionsScopes: jest.fn(),
    getRedGreenRefactorCommitTemplate: jest.fn().mockReturnValue({
      type: "{{type}}",
      subject: ": {{subject}}",
      body: "\n\n{{body}}",
    }),
    getRedGreenRefactorCommitTemplateOrder: jest
      .fn()
      .mockReturnValue(["type", "subject", "body"]),

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

  // System under test
  let sut: RedGreenRefactorStrategy;

  beforeEach(() => {
    sut = new RedGreenRefactorStrategy(
      mockPromptManager,
      mockConfigurationManager
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a commit", async () => {
    // Type
    const types = ["RED", "GREEN", "REFACTOR"];

    jest
      .spyOn(mockConfigurationManager, "getRedGreenRefactorCliOptionsTypes")
      .mockReturnValue(types);
    mockPromptManager.select.mockResolvedValueOnce("GREEN");

    // Subject
    jest
      .spyOn(
        mockConfigurationManager,
        "selectorRedGreenRefactorCliOptionsTypes"
      )
      .mockReturnValue({
        value: "GREEN",
        label: "GREEN: Make the test pass",
        patterns: [
          "Make test pass for {{feature}}",
          "Fix failing test for {{feature}}",
        ],
      });
    jest
      .spyOn(mockPromptManager, "select")
      .mockResolvedValueOnce(DEFAULT_COMMIT_SUBJECT);

    mockPromptManager.text.mockResolvedValueOnce("subject");

    // Body
    jest.spyOn(mockPromptManager, "confirm").mockResolvedValueOnce(true);
    jest
      .spyOn(mockPromptManager, "multiText")
      .mockResolvedValueOnce(["body line"]);

    const commit = await sut.getCommitMessage();

    expect(commit).toBe("GREEN: subject\n\nbody line");
  });
});
