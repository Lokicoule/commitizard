import { WizardCommitStateMachine } from "../state-machine/WizardCommitStateMachine";

export interface WizardCommitStateMachineFactory {
  create(): WizardCommitStateMachine;
}
