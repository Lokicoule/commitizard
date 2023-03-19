import { RedGreenRefactorStateMachine } from "../state-machine/RedGreenRefactorStateMachine";

export interface RedGreenRefactorStateMachineFactory {
  create(): RedGreenRefactorStateMachine;
}
