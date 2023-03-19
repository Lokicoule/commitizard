import { CustomSubjectInputHandler } from "./CustomSubjectInputHandler";
import { RedGreenRefactorStateMachine } from "../../state-machine/RedGreenRefactorStateMachine";
import { Config } from "../../../../core/config";
import { PromptManager } from "../../../../libs/prompt/PromptManager";
import { PromptManagerImpl } from "../../../../libs/prompt/impl/PromptManagerImpl";
import { RedGreenRefactorStateMachineImpl } from "../../state-machine/impl/RedGreenRefactorStateMachineImpl";
import { RedGreenRefactorState } from "../../types";

describe("CustomSubjectInputHandler", () => {
  let handler: CustomSubjectInputHandler;
  let promptManager: PromptManager;
  let stateMachine: RedGreenRefactorStateMachine;

  beforeEach(() => {
    promptManager = new PromptManagerImpl();
    stateMachine = new RedGreenRefactorStateMachineImpl(
      RedGreenRefactorState.CUSTOM_SUBJECT_INPUT,
      {} as Config,
      promptManager
    );

    handler = new CustomSubjectInputHandler(promptManager, {} as Config);
  });

  it("should return the correct ending state aka null", async () => {
    const subject = "Test commit message";
    jest.spyOn(promptManager, "text").mockResolvedValue(subject);

    const result = await handler.handle(stateMachine);

    expect(result).toBeNull();
  });

  it("should prompt the user for a commit subject and set it as the message in the state machine", async () => {
    const subject = "Test commit message";
    jest.spyOn(promptManager, "text").mockResolvedValue(subject);

    const result = await handler.handle(stateMachine);

    expect(promptManager.text).toHaveBeenCalledWith({
      message: "Enter commit subject:",
      abortMessage: "Commit subject selection aborted!",
    });
    expect(stateMachine.getMessage()).toBe(subject);
    expect(result).toBeNull();
  });

  it("should prompt the user for a commit subject until a valid subject is provided", async () => {
    const subject = "Test commit message";
    jest
      .spyOn(promptManager, "text")
      .mockResolvedValueOnce("")
      .mockResolvedValueOnce(subject);

    const result = await handler.handle(stateMachine);

    expect(promptManager.text).toHaveBeenCalledTimes(2);
    expect(promptManager.text).toHaveBeenNthCalledWith(1, {
      message: "Enter commit subject:",
      abortMessage: "Commit subject selection aborted!",
    });
    expect(promptManager.text).toHaveBeenNthCalledWith(2, {
      message: "Enter commit subject:",
      abortMessage: "Commit subject selection aborted!",
    });
    expect(stateMachine.getMessage()).toBe(subject);
    expect(result).toBeNull();
  });

  it("should throw an error if the prompt manager throws an error", async () => {
    jest.spyOn(promptManager, "text").mockRejectedValue(new Error("Test"));

    await expect(handler.handle(stateMachine)).rejects.toThrowError("Test");
  });
});
