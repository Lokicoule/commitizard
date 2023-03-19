import { RedGreenRefactorStateMachine } from "../../state-machine/RedGreenRefactorStateMachine";
import { Config } from "../../../../core/config";
import { PromptManager } from "../../../../libs/prompt/PromptManager";
import { PromptManagerImpl } from "../../../../libs/prompt/impl/PromptManagerImpl";
import { RedGreenRefactorStateMachineImpl } from "../../state-machine/impl/RedGreenRefactorStateMachineImpl";
import { RedGreenRefactorState } from "../../types";
import { PatternGroupSelectionHandler } from "./PatternGroupSelectionHandler";

describe("PatternGroupSelectionHandler", () => {
  let handler: PatternGroupSelectionHandler;
  let promptManager: PromptManager;
  let config: Config;
  let stateMachine: RedGreenRefactorStateMachine;

  beforeEach(() => {
    promptManager = new PromptManagerImpl();
    config = {
      "red-green-refactor": {
        cliOptions: {
          refactorOptions: [
            {
              value: "{{performance/maintainability}}",
              options: [
                {
                  value: "performance",
                  label: "performance",
                },
                {
                  value: "maintainability",
                  label: "maintainability",
                },
              ],
            },
          ],
        },
      },
    } as Config;
    stateMachine = new RedGreenRefactorStateMachineImpl(
      RedGreenRefactorState.PATTERN_GROUP_SELECTION,
      config,
      promptManager
    );
    handler = new PatternGroupSelectionHandler(promptManager, config);
  });

  it("should return the correct ending state aka null", async () => {
    const select = "maintainability";
    jest.spyOn(promptManager, "select").mockResolvedValue(select);

    const result = await handler.handle(stateMachine);
    expect(result).toBeNull();
  });

  it("should update the message", async () => {
    const select = "maintainability";
    jest.spyOn(promptManager, "select").mockResolvedValue(select);
    stateMachine.setType("REFACTOR");
    stateMachine.setMessage("{{performance/maintainability}} blabla");
    const result = await handler.handle(stateMachine);

    expect(promptManager.select).toHaveBeenCalledTimes(1);
    expect(stateMachine.getMessage()).toBe("maintainability blabla");
    expect(result).toBeNull();
  });

  it("should not prompt the select when pattern and groups don't match", async () => {
    const select = "maintainability";
    jest.spyOn(promptManager, "select").mockResolvedValue(select);
    stateMachine.setType("REFACTOR");
    stateMachine.setMessage("{{bad_pattern}}");

    const result = await handler.handle(stateMachine);

    expect(promptManager.select).toHaveBeenCalledTimes(0);
    expect(stateMachine.getMessage()).toBe("{{bad_pattern}}");
    expect(result).toBeNull();
  });
});
