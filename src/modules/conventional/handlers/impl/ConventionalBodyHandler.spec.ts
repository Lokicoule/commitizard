import { Config } from "../../../../core/config";
import { PromptManager } from "../../../../libs/prompt";
import { PromptManagerImpl } from "../../../../libs/prompt/impl/PromptManagerImpl";
import { CommitBuilder } from "../../../commit/builder/CommitBuilder";
import { CommitBuilderImpl } from "../../../commit/builder/impl/CommitBuilderImpl";
import { CommitBody } from "../../../commit/types";
import { ConventionalBodyHandler } from "./ConventionalBodyHandler";

describe("ConventionalBodyHandler", () => {
  let handler: ConventionalBodyHandler;
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
    handler = new ConventionalBodyHandler(promptManager, {} as Config);
  });

  it("should add body to commit", async () => {
    jest.spyOn(promptManager, "confirm").mockResolvedValueOnce(true);
    jest.spyOn(promptManager, "text").mockResolvedValueOnce("Add feature A");
    jest.spyOn(promptManager, "confirm").mockResolvedValueOnce(false);

    await handler.handle(commitBuilder);

    const expectedBody: CommitBody = {
      message: "Add feature A",
    };
    expect(commitBuilder.build()).toEqual(
      expect.objectContaining({
        body: expectedBody,
      })
    );
  });

  it("should add multiple body lines to commit", async () => {
    jest
      .spyOn(promptManager, "confirm")
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(false);

    jest
      .spyOn(promptManager, "text")
      .mockResolvedValueOnce("Add feature A")
      .mockResolvedValueOnce("Update tests");

    await handler.handle(commitBuilder);

    const expectedBody: CommitBody = {
      message: "Add feature A\nUpdate tests",
    };
    expect(commitBuilder.build()).toEqual(
      expect.objectContaining({
        body: expectedBody,
      })
    );
  });

  it("should not add body to commit", async () => {
    jest.spyOn(promptManager, "confirm").mockResolvedValueOnce(false);

    await handler.handle(commitBuilder);

    expect(commitBuilder.build().body?.message).toBe("");
  });

  it("should throw error when commit body is aborted", async () => {
    jest.spyOn(promptManager, "confirm").mockRejectedValueOnce(new Error());

    expect(() => handler.handle(commitBuilder)).rejects.toThrowError();
  });
});
