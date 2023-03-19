import { RedGreenCommitStateMachine } from "../state-machine/RedGreenCommitStateMachine";

export interface RedGreenCommitStateMachineFactory {
  create(): RedGreenCommitStateMachine;
}
