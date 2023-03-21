import { Config } from "~/core/config";
import { PromptManager } from "~/libs/prompt";
import { PromptManagerImpl } from "~/libs/prompt/impl/PromptManagerImpl";
import { CommitBuilderFactory } from "~/modules/commit/factory/CommitBuilderFactory";
import { CommitBuilder } from "../../../commit/builder/CommitBuilder";
import { CommitBuilderImpl } from "../../../commit/builder/impl/CommitBuilderImpl";
import { RedGreenRefactorSubjectHandler } from "./RedGreenRefactorSubjectHandler";

describe("RedGreenRefactorSubjectHandler", () => {
  let promptManager: PromptManager;
  let commitBuilder: CommitBuilder;
  let handler: RedGreenRefactorSubjectHandler;

  beforeEach(() => {
    promptManager = new PromptManagerImpl();

    handler = new RedGreenRefactorSubjectHandler(promptManager, {} as Config);
  });

  describe("processInput", () => {
    it("should throw an error if no commit type is available", async () => {});
  });

  describe("selectCommitSubject", () => {
    it("should return a commit subject with placeholders replaced with user input", async () => {});
  });

  describe("selectPlaceholders", () => {
    it("should return the subject if there are no placeholders", async () => {});

    it("should return the subject with placeholders replaced with user input", async () => {});
  });

  describe("inputCustomCommitSubject", () => {
    it("should return the user input as the commit subject", async () => {});
  });
});
