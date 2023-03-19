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

  beforeEach(() => {
    promptManager = new PromptManagerImpl();
    stateMachine = new RedGreenRefactorStateMachineImpl(
      RedGreenRefactorState.PATTERN_SUBJECT_SELECTION,
      {} as Config,
      promptManager
    );

    handler = new PatternSubjectSelectionHandler(promptManager, {} as Config);
  });
});
