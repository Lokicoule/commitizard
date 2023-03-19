import {
  RedGreenCommitState,
  RedGreenCommitStateMachine,
} from "../state-machine/RedGreenCommitStateMachine";

export interface RedGreenCommitHandler {
  setNext(handler: RedGreenCommitHandler): RedGreenCommitHandler;
  handle(
    stateMachine: RedGreenCommitStateMachine
  ): Promise<RedGreenCommitState | null>;
}
