/* import { PromptManagerImpl } from "~/libs/prompt/impl/PromptManagerImpl";
import { Config } from "~/core/configuration";
import { PromptManager } from "~/libs/prompt/PromptManager";
import { CommitBuilder } from "~/modules/commit/builder/CommitBuilder";
import { CommitBuilderImpl } from "~/modules/commit/builder/impl/CommitBuilderImpl";
import { ConventionalScopeHandler } from "./ConventionalScopeHandler";

describe("ConventionalScopeHandler", () => {
  let promptManager: PromptManager;
  let commitBuilder: CommitBuilder;
  let handler: ConventionalScopeHandler;

  beforeEach(() => {
    promptManager = new PromptManagerImpl();

    commitBuilder = new CommitBuilderImpl();
    commitBuilder.withSubject({
      message: "Add feature A",
    });
    commitBuilder.withType({
      message: "feat",
    });

    handler = new ConventionalScopeHandler(promptManager, {
      conventional: {
        cliOptions: {
          scopes: [
            {
              value: "scope1",
              label: "scope1 label",
            },
            {
              value: "scope2",
              label: "scope2 label",
            },
            {
              value: "scope3",
              label: "scope3 label",
            },
          ],
        },
      },
    } as Config);
  });

  describe("processInput", () => {
    it("should call selectCommitScope and set the scope on the commitBuilder", async () => {
      jest.spyOn(promptManager, "select").mockResolvedValueOnce("scope1");

      await handler.handle(commitBuilder);

      expect(promptManager.select).toHaveBeenCalledTimes(1);
      expect(commitBuilder.build()).toEqual(
        expect.objectContaining({
          scope: {
            message: "scope1",
          },
        })
      );
    });
  });

  describe("selectCommitScope", () => {
    it("should prompt text for a scope if no scopes are available", async () => {
      handler = new ConventionalScopeHandler(promptManager, {} as Config);

      jest.spyOn(promptManager, "text").mockResolvedValueOnce("input text");

      await handler.handle(commitBuilder);

      expect(promptManager.text).toHaveBeenCalledTimes(1);
    });

    it("should prompt for a scope if available scopes are empty", async () => {
      handler = new ConventionalScopeHandler(promptManager, {
        conventional: {
          cliOptions: {
            scopes: [],
          },
        },
      } as unknown as Config);

      jest.spyOn(promptManager, "text").mockResolvedValueOnce("input text");

      await handler.handle(commitBuilder);

      expect(promptManager.text).toHaveBeenCalledTimes(1);
    });

    it("should prompt for a scope if available scopes are present but user chooses not to select one", async () => {
      jest.spyOn(promptManager, "select").mockResolvedValueOnce("");
      jest.spyOn(promptManager, "text").mockResolvedValueOnce("input text");

      await handler.handle(commitBuilder);

      expect(promptManager.select).toHaveBeenCalledTimes(1);
      expect(promptManager.text).toHaveBeenCalledTimes(1);
      expect(commitBuilder.build()).toEqual(
        expect.objectContaining({
          scope: {
            message: "input text",
          },
        })
      );
    });
  });
});
 */
