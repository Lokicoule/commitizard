/* import { Config } from "~/core/configuration";
import { PromptManager } from "~/libs/prompt";
import { PromptManagerImpl } from "~/libs/prompt/impl/PromptManagerImpl";
import { CommitBuilder } from "~/modules/commit/builder/CommitBuilder";
import { CommitBuilderImpl } from "~/modules/commit/builder/impl/CommitBuilderImpl";
import { ConventionalTypeHandler } from "./ConventionalTypeHandler";

describe("ConventionalTypeHandler", () => {
  let promptManager: PromptManager;
  let commitBuilder: CommitBuilder;
  let handler: ConventionalTypeHandler;

  beforeEach(() => {
    promptManager = new PromptManagerImpl();

    commitBuilder = new CommitBuilderImpl();
    commitBuilder.withSubject({
      message: "Add feature A",
    });
    commitBuilder.withType({
      message: "feat",
    });

    handler = new ConventionalTypeHandler(promptManager, {
      conventional: {
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
    handler = new ConventionalTypeHandler(promptManager, {} as Config);

    await expect(handler.handle(commitBuilder)).rejects.toThrowError();
  });
});
 */
