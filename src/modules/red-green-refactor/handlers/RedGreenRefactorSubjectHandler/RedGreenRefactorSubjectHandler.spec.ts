import { blue } from "picocolors";
import { ConfigurationManager } from "~/core/configuration";
import { PromptManager } from "~/core/prompt";
import { CommitBuilder } from "~/modules/commit";
import { RedGreenRefactorSubjectHandler } from "./RedGreenRefactorSubjectHandler";

describe("RedGreenRefactorSubjectHandler", () => {
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
    multiSelectPaginate: jest.fn(),
  } as PromptManager;

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
  } as CommitBuilder;

  // System under test
  let sut: RedGreenRefactorSubjectHandler;

  beforeEach(() => {
    sut = new RedGreenRefactorSubjectHandler(
      mockPromptManager,
      mockConfigurationManager
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should throw an error if the commit type does not match the cli options", async () => {
    jest.spyOn(mockCommitBuilder, "getType").mockReturnValue({
      message: "GREEN",
    });

    jest
      .spyOn(
        mockConfigurationManager,
        "selectorRedGreenRefactorCliOptionsTypes"
      )
      .mockReturnValue(undefined);

    await expect(sut.handle(mockCommitBuilder)).rejects.toThrowError(
      "No commit type configuration found for " + blue("GREEN")
    );
  });

  it("should replace placeholders in the subject with user input", async () => {
    const expectedSubject = "Make test pass for bingo";
    jest.spyOn(mockCommitBuilder, "getType").mockReturnValue({
      message: "GREEN",
    });
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
          "Implement solution for {{feature}}",
          "Add code to pass test for {{feature}}",
          "Introduce passing test for {{feature}}",
          "Start passing test for {{feature}}",
          "Begin passing test for {{feature}}",
          "Initiate passing test for {{feature}}",
          "Setup passing test for {{feature}}",
        ],
      });

    jest
      .spyOn(mockPromptManager, "select")
      .mockResolvedValue("Make test pass for {{feature}}");

    jest.spyOn(mockPromptManager, "text").mockResolvedValue("bingo");

    await sut.handle(mockCommitBuilder);

    expect(mockPromptManager.select).toHaveBeenCalledWith({
      message: "Select commit subject:",
      options: [
        {
          label: "Use custom commit subject",
          value: "No commit subject",
        },
        {
          label: "Make test pass for {{feature}}",

          value: "Make test pass for {{feature}}",
        },
        {
          label: "Fix failing test for {{feature}}",
          value: "Fix failing test for {{feature}}",
        },
        {
          label: "Implement solution for {{feature}}",
          value: "Implement solution for {{feature}}",
        },
        {
          label: "Add code to pass test for {{feature}}",
          value: "Add code to pass test for {{feature}}",
        },
        {
          label: "Introduce passing test for {{feature}}",
          value: "Introduce passing test for {{feature}}",
        },
        {
          label: "Start passing test for {{feature}}",
          value: "Start passing test for {{feature}}",
        },
        {
          label: "Begin passing test for {{feature}}",
          value: "Begin passing test for {{feature}}",
        },
        {
          label: "Initiate passing test for {{feature}}",
          value: "Initiate passing test for {{feature}}",
        },
        {
          label: "Setup passing test for {{feature}}",
          value: "Setup passing test for {{feature}}",
        },
      ],
    });

    expect(mockPromptManager.text).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.stringContaining("Enter value for placeholder"),
      })
    );

    expect(mockCommitBuilder.withSubject).toHaveBeenCalledWith({
      message: expectedSubject,
    });
  });
  it("should ask for a custom subject if the user selects the custom option", async () => {
    const expectedSubject = "My custom subject";
    jest.spyOn(mockCommitBuilder, "getType").mockReturnValue({
      message: "GREEN",
    });
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
          "Implement solution for {{feature}}",
          "Add code to pass test for {{feature}}",
          "Introduce passing test for {{feature}}",
          "Start passing test for {{feature}}",
          "Begin passing test for {{feature}}",
          "Initiate passing test for {{feature}}",
          "Setup passing test for {{feature}}",
        ],
      });

    jest
      .spyOn(mockPromptManager, "select")
      .mockResolvedValue("No commit subject");

    jest.spyOn(mockPromptManager, "text").mockResolvedValue(expectedSubject);

    await sut.handle(mockCommitBuilder);

    expect(mockPromptManager.select).toHaveBeenCalledWith({
      message: "Select commit subject:",
      options: [
        {
          label: "Use custom commit subject",
          value: "No commit subject",
        },
        {
          label: "Make test pass for {{feature}}",

          value: "Make test pass for {{feature}}",
        },
        {
          label: "Fix failing test for {{feature}}",
          value: "Fix failing test for {{feature}}",
        },
        {
          label: "Implement solution for {{feature}}",
          value: "Implement solution for {{feature}}",
        },
        {
          label: "Add code to pass test for {{feature}}",
          value: "Add code to pass test for {{feature}}",
        },
        {
          label: "Introduce passing test for {{feature}}",
          value: "Introduce passing test for {{feature}}",
        },
        {
          label: "Start passing test for {{feature}}",
          value: "Start passing test for {{feature}}",
        },
        {
          label: "Begin passing test for {{feature}}",
          value: "Begin passing test for {{feature}}",
        },
        {
          label: "Initiate passing test for {{feature}}",
          value: "Initiate passing test for {{feature}}",
        },
        {
          label: "Setup passing test for {{feature}}",
          value: "Setup passing test for {{feature}}",
        },
      ],
    });

    expect(mockPromptManager.text).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Enter custom commit subject:",
      })
    );

    expect(mockCommitBuilder.withSubject).toHaveBeenCalledWith({
      message: expectedSubject,
    });
  });

  it("should validate the commit subject", async () => {
    const commitSubjectHandler = new RedGreenRefactorSubjectHandler(
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
