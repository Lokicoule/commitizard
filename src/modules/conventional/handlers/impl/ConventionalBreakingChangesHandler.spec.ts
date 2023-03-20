import { PromptManagerImpl } from "~/libs/prompt/impl/PromptManagerImpl";
import { Config } from "../../../../core/config";
import { PromptManager } from "../../../../libs/prompt/PromptManager";
import { CommitBuilder } from "../../builder/CommitBuilder";
import { CommitBuilderImpl } from "../../builder/impl/CommitBuilderImpl";
import { ConventionalBreakingChangesHandler } from "./ConventionalBreakingChangesHandler";

describe("ConventionalBreakingChangesHandler", () => {
  let promptManager: PromptManager;
  let commitBuilder: CommitBuilder;
  let handler: ConventionalBreakingChangesHandler;

  beforeEach(() => {
    promptManager = new PromptManagerImpl();

    commitBuilder = new CommitBuilderImpl();
    commitBuilder.withSubject({
      message: "Add feature A",
    });
    commitBuilder.withType({
      message: "feat",
    });

    handler = new ConventionalBreakingChangesHandler(
      promptManager,
      {} as Config
    );
  });

  it("should add empty string to commit's breaking changes when user selects 'no'", async () => {
    jest.spyOn(promptManager, "confirm").mockResolvedValue(false);

    await handler.handle(commitBuilder);

    expect(commitBuilder.build().breakingChanges?.message).toBe("");
  });

  it("should add breaking changes to commit when user selects 'yes'", async () => {
    jest.spyOn(promptManager, "confirm").mockResolvedValueOnce(true);
    jest
      .spyOn(promptManager, "text")
      .mockResolvedValueOnce("Breaking change 1");
    jest.spyOn(promptManager, "confirm").mockResolvedValueOnce(true);
    jest
      .spyOn(promptManager, "text")
      .mockResolvedValueOnce("Breaking change 2");
    jest.spyOn(promptManager, "confirm").mockResolvedValueOnce(false);

    await handler.handle(commitBuilder);

    expect(commitBuilder.build().breakingChanges).toEqual({
      message: "Breaking change 1\nBreaking change 2",
    });
  });

  it("should not add breaking changes to commit when user aborts", async () => {
    jest.spyOn(promptManager, "confirm").mockResolvedValueOnce(true);
    jest
      .spyOn(promptManager, "text")
      .mockResolvedValueOnce("Breaking change 1");
    jest.spyOn(promptManager, "confirm").mockResolvedValueOnce(true);
    jest
      .spyOn(promptManager, "text")
      .mockRejectedValueOnce(new Error("Aborted!"));

    expect(() => handler.handle(commitBuilder)).rejects.toThrowError();
  });
});
