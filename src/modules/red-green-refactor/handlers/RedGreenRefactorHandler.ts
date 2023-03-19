import {
  RedGreenRefactorState,
  RedGreenRefactorStateMachine,
} from "../state-machine/RedGreenRefactorStateMachine";

export interface RedGreenRefactorHandler {
  setNext(handler: RedGreenRefactorHandler): RedGreenRefactorHandler;
  handle(
    stateMachine: RedGreenRefactorStateMachine
  ): Promise<RedGreenRefactorState | null>;
}
