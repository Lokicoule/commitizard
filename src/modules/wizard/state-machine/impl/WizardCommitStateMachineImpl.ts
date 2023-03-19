import { WizardCommitHandler } from "../../handlers/WizardCommitHandler";
import { AddFilesToCommitHandler } from "../../handlers/impl/AddFilesToCommitHandler";
import { CommitCompleteHandler } from "../../handlers/impl/CommitCompleteHandler";
import { ReviewCommitHandler } from "../../handlers/impl/ReviewCommitHandler";
import { SelectConventionHandler } from "../../handlers/impl/SelectConventionHandler";
import { UseConventionalCommitHandler } from "../../handlers/impl/UseConventionalCommitHandler";
import { UseRedGreenCommitHandler } from "../../handlers/impl/UseRedGreenCommitHandler";
import {
  WizardCommitState,
  WizardCommitStateMachine,
} from "../WizardCommitStateMachine";

export class WizardCommitStateMachineImpl implements WizardCommitStateMachine {
  private currentState: WizardCommitState;
  private handlers: Record<WizardCommitState, WizardCommitHandler>;
  private message: string = "";

  constructor(initialState: WizardCommitState) {
    this.currentState = initialState;
    this.handlers = {
      [WizardCommitState.AddFilesToCommit]: new AddFilesToCommitHandler(),
      [WizardCommitState.SelectConvention]: new SelectConventionHandler(),
      [WizardCommitState.UseConventionalCommit]:
        new UseConventionalCommitHandler(),
      [WizardCommitState.UseRedGreenCommit]: new UseRedGreenCommitHandler(),
      [WizardCommitState.ReviewCommit]: new ReviewCommitHandler(),
      [WizardCommitState.CommitComplete]: new CommitCompleteHandler(),
    };
  }

  public getState(): WizardCommitState {
    return this.currentState;
  }

  public async handleCommit(): Promise<void> {
    let nextState = await this.handlers[this.currentState].handle(this);
    while (nextState) {
      this.currentState = nextState;
      nextState = await this.handlers[this.currentState].handle(this);
    }
  }

  public setMessage(message: string): void {
    this.message = message;
  }

  public getMessage(): string {
    return this.message;
  }
}
