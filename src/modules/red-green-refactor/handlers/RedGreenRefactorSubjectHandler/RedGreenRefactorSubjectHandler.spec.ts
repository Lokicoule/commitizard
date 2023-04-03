import { blue } from "picocolors";
import { ConfigurationManager } from "~/core/configuration";
import { PromptManager } from "~/core/prompt";
import { CommitBuilder } from "~/modules/commit";
import {
  DEFAULT_COMMIT_SUBJECT,
  RedGreenRefactorSubjectHandler,
} from "./RedGreenRefactorSubjectHandler";

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

  it("should handle subject without placeholders", async () => {
    const expectedSubject = "Make test pass";
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
        patterns: ["Make test pass"],
      });

    jest.spyOn(mockPromptManager, "select").mockResolvedValue("Make test pass");

    await sut.handle(mockCommitBuilder);

    expect(mockPromptManager.select).toHaveBeenCalledWith({
      message: "Select commit subject:",
      options: [
        {
          label: "Use custom commit subject",
          value: "No commit subject",
        },
        {
          label: "Make test pass",
          value: "Make test pass",
        },
      ],
    });

    expect(mockCommitBuilder.withSubject).toHaveBeenCalledWith({
      message: expectedSubject,
    });
  });

  it("should handle placeholders with multiple options separated by a slash", async () => {
    const expectedSubject = "Make test pass for optionA";
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
        patterns: ["Make test pass for {{optionA/optionB}}"],
      });

    (mockPromptManager.select as jest.Mock).mockImplementation((options) => {
      if (options.message === "Select commit subject:") {
        return Promise.resolve("Make test pass for {{optionA/optionB}}");
      }
      if (options.message.includes("Select value for placeholder")) {
        return Promise.resolve("optionA");
      }
    });

    await sut.handle(mockCommitBuilder);

    expect(mockPromptManager.select).toHaveBeenCalledWith({
      message: "Select commit subject:",
      options: [
        {
          label: "Use custom commit subject",
          value: "No commit subject",
        },
        {
          label: "Make test pass for {{optionA/optionB}}",
          value: "Make test pass for {{optionA/optionB}}",
        },
      ],
    });

    expect(mockPromptManager.select).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.stringContaining("Select value for placeholder"),
      })
    );

    expect(mockCommitBuilder.withSubject).toHaveBeenCalledWith({
      message: expectedSubject,
    });
  });

  it("should handle empty placeholder values", async () => {
    const expectedSubject = "Add new feature My custom subject";
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
        label: "GREEN: Add new feature",
        patterns: ["Add new feature {{description}}"],
      });

    (mockPromptManager.select as jest.Mock).mockImplementation((options) => {
      if (options.message === "Select commit subject:") {
        return Promise.resolve("Add new feature {{description}}");
      }
      if (options.message.includes("Select value for placeholder")) {
        return Promise.resolve("");
      }
    });

    await sut.handle(mockCommitBuilder);

    expect(mockCommitBuilder.withSubject).toHaveBeenCalledWith({
      message: expectedSubject,
    });
  });

  it("should handle non-empty placeholder values", async () => {
    const expectedSubject = "Add new feature My custom subject";
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
        label: "GREEN: Add new feature",
        patterns: ["Add new feature {{description}}"],
      });

    (mockPromptManager.select as jest.Mock).mockImplementation((options) => {
      if (options.message === "Select commit subject:") {
        return Promise.resolve("Add new feature {{description}}");
      }
      if (options.message.includes("Select value for placeholder")) {
        return Promise.resolve("My custom subject");
      }
    });

    await sut.handle(mockCommitBuilder);

    expect(mockCommitBuilder.withSubject).toHaveBeenCalledWith({
      message: expectedSubject,
    });
  });

  it("selectPlaceholders should throw an error if the placeholder is required and no value is entered", async () => {
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
        label: "GREEN: Add new feature",
        patterns: ["Add new feature {{requiredPlaceholder}}"],
      });

    (mockPromptManager.select as jest.Mock).mockResolvedValue(
      "Add new feature {{requiredPlaceholder}}"
    );
    (mockPromptManager.text as jest.Mock).mockImplementation((options) => {
      if (options.validate) {
        const validationResult = options.validate("");
        expect(validationResult).toEqual("requiredPlaceholder is required!");
      }
      return Promise.resolve("A valid commit subject");
    });

    await expect(sut.handle(mockCommitBuilder)).rejects.toThrow();
  });

  it("inputCustomCommitSubject should not call withSubject if no value is entered for the custom commit subject", async () => {
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
        label: "GREEN: Add new feature",
        patterns: ["Add new feature {{description}}"],
      });

    (mockPromptManager.select as jest.Mock).mockResolvedValue(
      DEFAULT_COMMIT_SUBJECT
    );
    (mockPromptManager.text as jest.Mock).mockImplementation((options) => {
      if (options.validate) {
        const validationResult = options.validate("");
        expect(validationResult).toEqual("Subject is required!");
      }
      return Promise.resolve("");
    });

    await sut.handle(mockCommitBuilder);
    expect(mockCommitBuilder.withSubject).toBeCalledWith({
      message: "",
    });
  });
});
