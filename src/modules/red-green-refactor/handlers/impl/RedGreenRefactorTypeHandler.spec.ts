import { Config } from "~/core/config";
import { PromptManager } from "~/libs/prompt";
import { PromptManagerImpl } from "~/libs/prompt/impl/PromptManagerImpl";
import { CommitBuilder } from "../../../commit/builder/CommitBuilder";
import { CommitBuilderImpl } from "../../../commit/builder/impl/CommitBuilderImpl";
import { RedGreenRefactorTypeHandler } from "./RedGreenRefactorTypeHandler";

describe("RedGreenRefactorTypeHandler", () => {
  let promptManager: PromptManager;
  let commitBuilder: CommitBuilder;
  let handler: RedGreenRefactorTypeHandler;

  beforeEach(() => {
    promptManager = new PromptManagerImpl();

    commitBuilder = new CommitBuilderImpl();
    commitBuilder.withSubject({
      message: "Add feature A",
    });
    commitBuilder.withType({
      message: "feat",
    });

    handler = new RedGreenRefactorTypeHandler(promptManager, {
      redGreenRefactor: {
        cliOptions: {
          types: [
            {
              value: "type1",
              label: "type1 label",
            },
            {
              value: "type2",
              label: "type2 label",
            },
          ],
        },
      },
    } as Config);
  });

  it("should prompt select", async () => {
    jest.spyOn(promptManager, "select").mockResolvedValueOnce("type1");

    await handler.handle(commitBuilder);

    expect(promptManager.select).toHaveBeenCalledTimes(1);
    expect(commitBuilder.build()).toEqual(
      expect.objectContaining({
        type: {
          message: "type1",
        },
      })
    );
  });

  it("should throw error if no types are provided", async () => {
    handler = new RedGreenRefactorTypeHandler(promptManager, {} as Config);

    await expect(handler.handle(commitBuilder)).rejects.toThrowError();
  });
});
