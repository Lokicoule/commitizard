import { Config } from "../../../../core/config";
import { PromptManager } from "../../../../libs/prompt";
import { PromptManagerImpl } from "../../../../libs/prompt/impl/PromptManagerImpl";
import { CommitBuilder } from "../../../commit/builder/CommitBuilder";
import { CommitBuilderImpl } from "../../../commit/builder/impl/CommitBuilderImpl";
import { CommitFooter } from "../../../commit/types";
import { ConventionalFooterHandler } from "./ConventionalFooterHandler";

describe("ConventionalFooterHandler", () => {
  let handler: ConventionalFooterHandler;
  let commitBuilder: CommitBuilder;
  let promptManager: PromptManager;

  beforeEach(() => {
    commitBuilder = new CommitBuilderImpl();
    commitBuilder.withSubject({
      message: "Add feature A",
    });
    commitBuilder.withType({
      message: "feat",
    });
    promptManager = new PromptManagerImpl();
    handler = new ConventionalFooterHandler(promptManager, {} as Config);
  });

  it("should add footer to commit", async () => {
    jest.spyOn(promptManager, "confirm").mockResolvedValueOnce(true);
    jest.spyOn(promptManager, "text").mockResolvedValueOnce("Add footer A");
    jest.spyOn(promptManager, "confirm").mockResolvedValueOnce(false);

    await handler.handle(commitBuilder);

    const expectedFooter: CommitFooter = {
      message: "Add footer A",
    };
    expect(commitBuilder.build()).toEqual(
      expect.objectContaining({
        footer: expectedFooter,
      })
    );
  });

  it("should add multiple footer lines to commit", async () => {
    jest
      .spyOn(promptManager, "confirm")
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(false);

    jest
      .spyOn(promptManager, "text")
      .mockResolvedValueOnce("Add footer A")
      .mockResolvedValueOnce("Update tests");

    await handler.handle(commitBuilder);

    const expectedFooter: CommitFooter = {
      message: "Add footer A\nUpdate tests",
    };
    expect(commitBuilder.build()).toEqual(
      expect.objectContaining({
        footer: expectedFooter,
      })
    );
  });

  it("should not add footer to commit", async () => {
    jest.spyOn(promptManager, "confirm").mockResolvedValueOnce(false);

    await handler.handle(commitBuilder);

    expect(commitBuilder.build().footer?.message).toBe("");
  });

  it("should throw error when commit footer is aborted", async () => {
    jest.spyOn(promptManager, "confirm").mockRejectedValueOnce(new Error());

    expect(() => handler.handle(commitBuilder)).rejects.toThrowError();
  });
});
