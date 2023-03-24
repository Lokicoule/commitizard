import { ConfigurationManager } from "~/core/configuration";
import { PromptManager } from "~/core/prompt";
import { ConventionalStrategy } from "./ConventionalStrategy";

describe("ConventionalStrategy", () => {
  const mockConfigurationManager = {
    getVersion: jest.fn(),
    getWizardMaxViewFilesToShow: jest.fn(),
    getConventionalCommitTemplate: jest.fn().mockReturnValue({
      type: "{{type}}",
      scope: "({{scope}})",
      subject: ": {{subject}}",
      body: "\n\n{{body}}",
      footer: "\n\n{{footer}}",
      breaking: "\n\nBREAKING CHANGE:\n {{breaking}}",
      refs: "\n\nRefs: {{refs}}",
    }),
    getConventionalCommitTemplateOrder: jest
      .fn()
      .mockReturnValue([
        "type",
        "scope",
        "subject",
        "body",
        "breaking",
        "footer",
        "refs",
      ]),
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

  // System under test
  let sut: ConventionalStrategy;

  beforeEach(() => {
    sut = new ConventionalStrategy(mockPromptManager, mockConfigurationManager);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getCommit", () => {
    it("should return a commit", async () => {
      // Type
      const types = ["feat", "fix", "chore"];
      mockPromptManager.select.mockResolvedValueOnce(types[1]);
      mockConfigurationManager.getConventionalCliOptionsTypes.mockReturnValue(
        types
      );

      // Scope
      const scopes = [
        {
          value: "scope_test",
          label: "scope_test",
        },
      ];
      mockConfigurationManager.getConventionalCliOptionsScopes.mockReturnValue(
        scopes
      );
      mockPromptManager.select.mockResolvedValueOnce("test");

      // Subject
      const subject = "subject";
      mockPromptManager.text.mockResolvedValueOnce(subject);

      // Body
      jest.spyOn(mockPromptManager, "confirm").mockResolvedValueOnce(true);
      jest
        .spyOn(mockPromptManager, "multiText")
        .mockResolvedValueOnce(["body line"]);

      // Breaking Changes
      jest.spyOn(mockPromptManager, "confirm").mockResolvedValueOnce(true);
      jest
        .spyOn(mockPromptManager, "multiText")
        .mockResolvedValueOnce(["breaking changes line"]);

      // References
      jest.spyOn(mockPromptManager, "confirm").mockResolvedValueOnce(true);
      mockPromptManager.text.mockResolvedValueOnce("references");
      jest.spyOn(mockPromptManager, "confirm").mockResolvedValueOnce(false);

      // Footer
      jest.spyOn(mockPromptManager, "confirm").mockResolvedValueOnce(true);
      jest
        .spyOn(mockPromptManager, "multiText")
        .mockResolvedValueOnce(["footer line"]);

      const commit = await sut.getCommitMessage();

      expect(commit).toBe(
        "fix(test): subject\n\nbody line\n\nBREAKING CHANGE:\n breaking changes line\n\nfooter line\n\nRefs: #references"
      );
    });
  });
});
