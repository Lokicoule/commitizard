import { RedGreenRefactorStateMachine } from "../../state-machine/RedGreenRefactorStateMachine";
import { Config } from "../../../../core/config";
import { PromptManager } from "../../../../libs/prompt/PromptManager";
import { PromptManagerImpl } from "../../../../libs/prompt/impl/PromptManagerImpl";
import { RedGreenRefactorStateMachineImpl } from "../../state-machine/impl/RedGreenRefactorStateMachineImpl";
import { RedGreenRefactorState } from "../../types";
import { TypeSelectionHandler } from "./TypeSelectionHandler";

describe("TypeSelectionHandler", () => {
  let handler: TypeSelectionHandler;
  let promptManager: PromptManager;
  let stateMachine: RedGreenRefactorStateMachine;
  let config: Config;

  beforeEach(() => {
    config = {
      redGreenRefactor: {
        cliOptions: {
          types: [
            {
              value: "RED",
              label: "RED: Write a test that fails",
            },
            {
              value: "GREEN",
              label: "GREEN: Make the test pass",
            },
            {
              value: "REFACTOR",
              label:
                "REFACTOR: Refactor the code without changing functionality",
            },
          ],
        },
      },
    } as Config;
    promptManager = new PromptManagerImpl();
    stateMachine = new RedGreenRefactorStateMachineImpl(
      RedGreenRefactorState.TYPE_SELECTION,
      config,
      promptManager
    );

    handler = new TypeSelectionHandler(promptManager, config);
  });

  it("should set the type on the state machine", async () => {
    jest.spyOn(promptManager, "select").mockResolvedValue("RED");
    await handler.handle(stateMachine);
    expect(stateMachine.getType()).toBe("RED");
  });

  it("should return to the pattern subject selection state", async () => {
    jest.spyOn(promptManager, "select").mockResolvedValue("RED");
    let result = await handler.handle(stateMachine);
    expect(result).toBe(RedGreenRefactorState.PATTERN_SUBJECT_SELECTION);
  });

  it("should throw an error if no types configured", async () => {
    handler = new TypeSelectionHandler(promptManager, {
      redGreenRefactor: {
        cliOptions: {
          types: [],
        },
      },
    } as unknown as Config);

    jest.spyOn(promptManager, "select").mockResolvedValue("RED");
    await expect(handler.handle(stateMachine)).rejects.toThrowError(
      "No types configured!"
    );
  });
});
