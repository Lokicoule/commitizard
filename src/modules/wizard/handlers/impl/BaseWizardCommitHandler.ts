import {
  WizardCommitState,
  WizardCommitStateMachine,
} from "../../state-machine/WizardCommitStateMachine";
import { WizardCommitHandler } from "../WizardCommitHandler";

export abstract class BaseWizardCommitHandler implements WizardCommitHandler {
  private nextHandler: WizardCommitHandler | null = null;

  public setNext(handler: WizardCommitHandler): WizardCommitHandler {
    this.nextHandler = handler;
    return handler;
  }

  public async handle(
    wizard: WizardCommitStateMachine
  ): Promise<WizardCommitState | null> {
    if (this.nextHandler) {
      return await this.nextHandler.handle(wizard);
    }
    return null;
  }
}
