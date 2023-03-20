import { PromptManagerImpl } from "~/libs/prompt/impl/PromptManagerImpl";
import { Config } from "../../../../core/config";
import { PromptManager } from "../../../../libs/prompt/PromptManager";
import { CommitBuilder } from "../../builder/CommitBuilder";
import { CommitBuilderImpl } from "../../builder/impl/CommitBuilderImpl";
import { ConventionalReferencesHandler } from "./ConventionalReferencesHandler";

describe("ConventionalReferencesHandler", () => {
  let promptManager: PromptManager;
  let commitBuilder: CommitBuilder;
  let handler: ConventionalReferencesHandler;

  beforeEach(() => {
    promptManager = new PromptManagerImpl();

    commitBuilder = new CommitBuilderImpl();
    commitBuilder.withSubject({
      message: "Add feature A",
    });
    commitBuilder.withType({
      message: "feat",
    });

    handler = new ConventionalReferencesHandler(promptManager, {} as Config);
  });

  it("should add empty string to commit's references when user selects 'no'", async () => {
    jest.spyOn(promptManager, "confirm").mockResolvedValue(false);

    await handler.handle(commitBuilder);

    expect(commitBuilder.build().references?.message).toBe("");
  });

  it("should add references to commit when user selects 'yes'", async () => {
    jest.spyOn(promptManager, "confirm").mockResolvedValueOnce(true);
    jest.spyOn(promptManager, "text").mockResolvedValueOnce("Ref 1");
    jest.spyOn(promptManager, "confirm").mockResolvedValueOnce(true);
    jest.spyOn(promptManager, "text").mockResolvedValueOnce("Ref 2");
    jest.spyOn(promptManager, "confirm").mockResolvedValueOnce(false);

    await handler.handle(commitBuilder);

    expect(commitBuilder.build().references).toEqual({
      message: "#Ref 1, #Ref 2",
    });
  });

  it("should throw an error when user aborts", async () => {
    jest.spyOn(promptManager, "confirm").mockResolvedValueOnce(true);
    jest.spyOn(promptManager, "text").mockResolvedValueOnce("Ref 1");
    jest.spyOn(promptManager, "confirm").mockResolvedValueOnce(true);
    jest
      .spyOn(promptManager, "text")
      .mockRejectedValueOnce(new Error("Aborted!"));

    expect(() => handler.handle(commitBuilder)).rejects.toThrowError();
  });
});
