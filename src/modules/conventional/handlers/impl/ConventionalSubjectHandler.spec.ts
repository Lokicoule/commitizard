import { Config } from "~/core/config";
import { PromptManager } from "~/libs/prompt";
import { PromptManagerImpl } from "~/libs/prompt/impl/PromptManagerImpl";
import { CommitBuilder } from "../../../commit/builder/CommitBuilder";
import { CommitBuilderImpl } from "../../../commit/builder/impl/CommitBuilderImpl";
import { ConventionalSubjectHandler } from "./ConventionalSubjectHandler";

describe("ConventionalSubjectHandler", () => {
  let promptManager: PromptManager;
  let commitBuilder: CommitBuilder;
  let handler: ConventionalSubjectHandler;

  beforeEach(() => {
    promptManager = new PromptManagerImpl();

    commitBuilder = new CommitBuilderImpl();
    commitBuilder.withSubject({
      message: "Add feature A",
    });
    commitBuilder.withType({
      message: "feat",
    });

    handler = new ConventionalSubjectHandler(promptManager, {} as Config);
  });

  it("should prompt text for a subject", async () => {
    handler = new ConventionalSubjectHandler(promptManager, {} as Config);

    jest.spyOn(promptManager, "text").mockResolvedValueOnce("input text");

    await handler.handle(commitBuilder);

    expect(promptManager.text).toHaveBeenCalledTimes(1);
    expect(commitBuilder.build()).toEqual(
      expect.objectContaining({
        subject: {
          message: "input text",
        },
      })
    );
  });
});
