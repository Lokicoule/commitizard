import {
  WizardCommitState,
  WizardCommitStateMachine,
} from "../state-machine/WizardCommitStateMachine";

export interface WizardCommitHandler {
  setNext(handler: WizardCommitHandler): WizardCommitHandler;
  handle(wizard: WizardCommitStateMachine): Promise<WizardCommitState | null>;
}
