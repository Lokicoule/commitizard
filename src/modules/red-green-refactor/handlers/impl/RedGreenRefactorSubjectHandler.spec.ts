/* import { Config } from "~/core/configuration";
import { PromptManager } from "~/libs/prompt";
import { PromptManagerImpl } from "~/libs/prompt/impl/PromptManagerImpl";
import { CommitBuilderFactory } from "~/modules/commit/builder/CommitBuilderFactory";
import { CommitBuilder } from "~/modules/commit/builder/CommitBuilder";
import { CommitBuilderImpl } from "~/modules/commit/builder/impl/CommitBuilderImpl";
import { RedGreenRefactorSubjectHandler } from "./RedGreenRefactorSubjectHandler";

describe("RedGreenRefactorSubjectHandler", () => {
  let promptManager: PromptManager;
  let handler: RedGreenRefactorSubjectHandler;

  beforeEach(() => {
    promptManager = new PromptManagerImpl();
  });

  describe("processInput", () => {
    it("should throw an error if no commit type is available", async () => {
      const commitBuilder = CommitBuilderFactory.create();
      handler = new RedGreenRefactorSubjectHandler(promptManager, {} as Config);

      await expect(handler.handle(commitBuilder)).rejects.toThrowError();
    });
  });

  describe("selectCommitSubject", () => {
    it("should return a commit subject with placeholders replaced with user input", async () => {
      const commitBuilder = CommitBuilderFactory.create();
      handler = new RedGreenRefactorSubjectHandler(promptManager, {} as Config);
    });
  });

  describe("selectPlaceholders", () => {
    it("should return the subject if there are no placeholders", async () => {
      const commitBuilder = CommitBuilderFactory.create();
      handler = new RedGreenRefactorSubjectHandler(promptManager, {} as Config);
    });

    it("should return the subject with placeholders replaced with user input", async () => {
      const commitBuilder = CommitBuilderFactory.create();
      handler = new RedGreenRefactorSubjectHandler(promptManager, {} as Config);
    });
  });

  describe("inputCustomCommitSubject", () => {
    it("should return the user input as the commit subject", async () => {
      const commitBuilder = CommitBuilderFactory.create();
    });
  });
});
 */
