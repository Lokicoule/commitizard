import { yellow } from "picocolors";
import { Config } from "../../../../core/config";
import { PromptManagerImpl } from "../../../../libs/prompt/impl/PromptManagerImpl";
import { PromptManager } from "../../../../libs/prompt/PromptManager";
import { RedGreenRefactorStateMachineImpl } from "../../state-machine/impl/RedGreenRefactorStateMachineImpl";
import { RedGreenRefactorState } from "../../types";
import { FeatureSubjectInputHandler } from "./FeatureSubjectInputHandler";

describe("FeatureSubjectInputHandler", () => {
  let handler: FeatureSubjectInputHandler;
  let promptManager: PromptManager;

  beforeEach(() => {
    promptManager = new PromptManagerImpl();
    handler = new FeatureSubjectInputHandler(promptManager, {} as Config);
  });

  it("should return the correct ending state aka null", async () => {
    const feature = "test_feature";
    jest.spyOn(promptManager, "text").mockResolvedValue(feature);

    const stateMachine = new RedGreenRefactorStateMachineImpl(
      RedGreenRefactorState.FEATURE_SUBJECT_INPUT,
      {} as Config,
      promptManager
    );
    stateMachine.setType("GREEN");
    stateMachine.setMessage("test_message");
    let result = await handler.handle(stateMachine);
    expect(result).toBeNull();

    stateMachine.setType("green");
    result = await handler.handle(stateMachine);
    expect(result).toBeNull();

    stateMachine.setType("RED");
    result = await handler.handle(stateMachine);
    expect(result).toBeNull();

    stateMachine.setType("red");
    result = await handler.handle(stateMachine);
    expect(result).toBeNull();
  });

  it("should return the correct next state", async () => {
    const feature = "test_feature";
    jest.spyOn(promptManager, "text").mockResolvedValue(feature);

    const stateMachine = new RedGreenRefactorStateMachineImpl(
      RedGreenRefactorState.FEATURE_SUBJECT_INPUT,
      {} as Config,
      promptManager
    );
    stateMachine.setType("REFACTOR");
    stateMachine.setMessage("test_message");
    let result = await handler.handle(stateMachine);
    expect(result).toBe(RedGreenRefactorState.PATTERN_GROUP_SELECTION);

    stateMachine.setType("refactor");
    result = await handler.handle(stateMachine);
    expect(result).toBe(RedGreenRefactorState.PATTERN_GROUP_SELECTION);
  });

  it("should prompt the user for a feature commit subject and set it as the message in the state machine", async () => {
    const feature = "my_feature";
    jest.spyOn(promptManager, "text").mockResolvedValue(feature);

    const stateMachine = new RedGreenRefactorStateMachineImpl(
      RedGreenRefactorState.FEATURE_SUBJECT_INPUT,
      {} as Config,
      promptManager
    );
    stateMachine.setType("GREEN");
    stateMachine.setMessage("{{feature}} bla bla bla");
    const result = await handler.handle(stateMachine);

    expect(promptManager.text).toHaveBeenCalledWith({
      message: "Enter feature name:",
      abortMessage: `${yellow("Aborting commit")}`,
    });
    expect(stateMachine.getMessage()).toBe(`${feature} bla bla bla`);
    expect(result).toBeNull();
  });
});
