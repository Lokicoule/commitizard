import { RedGreenRefactorStateMachine } from "../../state-machine/RedGreenRefactorStateMachine";
import { Config } from "../../../../core/config";
import { PromptManager } from "../../../../libs/prompt/PromptManager";
import { PromptManagerImpl } from "../../../../libs/prompt/impl/PromptManagerImpl";
import { RedGreenRefactorStateMachineImpl } from "../../state-machine/impl/RedGreenRefactorStateMachineImpl";
import { RedGreenRefactorState } from "../../types";
import { PatternSubjectSelectionHandler } from "./PatternSubjectSelectionHandler";

describe("PatternSubjectSelectionHandler", () => {
  let handler: PatternSubjectSelectionHandler;
  let promptManager: PromptManager;
  let stateMachine: RedGreenRefactorStateMachine;
  let config: Config;

  beforeEach(() => {
    config = {
      "red-green-refactor": {
        cliOptions: {
          redPatterns: [
            "Add failing test for {{feature}}",
            "Write failing test for {{feature}}",
            "Create failing test for {{feature}}",
            "Implement failing test for {{feature}}",
            "Introduce failing test for {{feature}}",
            "Start failing test for {{feature}}",
            "Begin failing test for {{feature}}",
            "Initiate failing test for {{feature}}",
            "Setup failing test for {{feature}}",
          ],
          greenPatterns: [
            "Make test pass for {{feature}}",
            "Fix failing test for {{feature}}",
            "Implement solution for {{feature}}",
            "Add code to pass test for {{feature}}",
            "Introduce passing test for {{feature}}",
            "Start passing test for {{feature}}",
            "Begin passing test for {{feature}}",
            "Initiate passing test for {{feature}}",
            "Setup passing test for {{feature}}",
          ],
          refactorPatterns: [
            "Refactor {{feature}} to improve {{performance/maintainability/readability/usability}}",
            "Restructure {{feature}} to {{simplify/consolidate/clarify}}",
            "Reorganize {{feature}} to {{streamline/improve}}",
            "Simplify {{feature}} by {{removing unnecessary code/logic}}",
            "Optimize {{feature}} by {{reducing complexity/improving efficiency}}",
            "Improve {{feature}} by {{cleaning up/rewriting}} code for {{clarity/consistency}}",
          ],
        },
      },
    } as Config;
    promptManager = new PromptManagerImpl();
    stateMachine = new RedGreenRefactorStateMachineImpl(
      RedGreenRefactorState.PATTERN_SUBJECT_SELECTION,
      config,
      promptManager
    );

    handler = new PatternSubjectSelectionHandler(promptManager, config);
  });

  it("should return the custom subject input state when using a custom subject", async () => {
    jest.spyOn(promptManager, "select").mockResolvedValue("custom");
    stateMachine.setType("REFACTOR");

    let result = await handler.handle(stateMachine);

    expect(result).toBe(RedGreenRefactorState.CUSTOM_SUBJECT_INPUT);
  });

  it("should return the feature subject input state when using a feature subject", async () => {
    jest.spyOn(promptManager, "select").mockResolvedValue("feature");
    stateMachine.setType("GREEN");

    let result = await handler.handle(stateMachine);

    expect(result).toBe(RedGreenRefactorState.FEATURE_SUBJECT_INPUT);
  });

  it("should update the state machine with the selected subject", async () => {
    jest.spyOn(promptManager, "select").mockResolvedValue("feature");
    stateMachine.setType("GREEN");

    await handler.handle(stateMachine);

    expect(stateMachine.getMessage()).toBe("feature");
  });
});
