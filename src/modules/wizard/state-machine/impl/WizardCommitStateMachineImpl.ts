import { WizardCommitHandler } from "../../handlers/WizardCommitHandler";
import { AddFilesToCommitHandler } from "../../handlers/impl/AddFilesToCommitHandler";
import { RunGitCommitProcessHandler } from "../../handlers/impl/RunGitCommitProcessHandler";
import { ReviewCommitHandler } from "../../handlers/impl/ReviewCommitHandler";
import { SelectConventionHandler } from "../../handlers/impl/SelectConventionHandler";
import { UseConventionalCommitHandler } from "../../handlers/impl/UseConventionalCommitHandler";
import { UseRedGreenCommitHandler } from "../../handlers/impl/UseRedGreenCommitHandler";
import {
  WizardCommitState,
  WizardCommitStateMachine,
} from "../WizardCommitStateMachine";

export type Store = {
  message: string;
};

export interface Context {
  state: WizardCommitState;
  store: Store;
}

const transitions: Record<WizardCommitState, WizardCommitState[]> = {
  [WizardCommitState.ADD_FILES_TO_COMMIT]: [
    WizardCommitState.SELECT_COMMIT_CONVENTION,
  ],
  [WizardCommitState.SELECT_COMMIT_CONVENTION]: [
    WizardCommitState.USE_CONVENTIONAL_COMMIT_CONVENTION,
    WizardCommitState.USE_RED_GREEN_REFACTOR_COMMIT_CONVENTION,
  ],
  [WizardCommitState.USE_CONVENTIONAL_COMMIT_CONVENTION]: [
    WizardCommitState.REVIEW_COMMIT_MESSAGE,
  ],
  [WizardCommitState.USE_RED_GREEN_REFACTOR_COMMIT_CONVENTION]: [
    WizardCommitState.REVIEW_COMMIT_MESSAGE,
  ],
  [WizardCommitState.REVIEW_COMMIT_MESSAGE]: [
    WizardCommitState.RUN_GIT_COMMIT_PROCESS,
  ],
  [WizardCommitState.RUN_GIT_COMMIT_PROCESS]: [],
};

export class WizardCommitStateMachineImpl implements WizardCommitStateMachine {
  private context: Context;
  private handlers: Record<WizardCommitState, WizardCommitHandler>;

  constructor(initialState: WizardCommitState) {
    this.context = {
      state: initialState,
      store: {
        message: "",
      },
    };
    this.handlers = {
      [WizardCommitState.ADD_FILES_TO_COMMIT]: new AddFilesToCommitHandler(),
      [WizardCommitState.SELECT_COMMIT_CONVENTION]:
        new SelectConventionHandler(),
      [WizardCommitState.USE_CONVENTIONAL_COMMIT_CONVENTION]:
        new UseConventionalCommitHandler(),
      [WizardCommitState.USE_RED_GREEN_REFACTOR_COMMIT_CONVENTION]:
        new UseRedGreenCommitHandler(),
      [WizardCommitState.REVIEW_COMMIT_MESSAGE]: new ReviewCommitHandler(),
      [WizardCommitState.RUN_GIT_COMMIT_PROCESS]:
        new RunGitCommitProcessHandler(),
    };
  }

  public getState(): WizardCommitState {
    return this.context.state;
  }

  public async handleCommit(): Promise<void> {
    let nextState = await this.handlers[this.context.state].handle(this);

    while (nextState) {
      this.context.state = nextState;
      nextState = await this.handlers[this.context.state].handle(this);
      if (nextState && this.canTransitionTo(nextState)) {
        this.transitionTo(nextState);
      }
    }
  }

  public setMessage(message: string): void {
    this.context.store.message = message;
  }

  public getMessage(): string {
    return this.context.store.message;
  }

  private canTransitionTo(state: WizardCommitState): boolean {
    return transitions[this.context.state].includes(state);
  }

  private transitionTo(state: WizardCommitState): void {
    if (this.canTransitionTo(state)) {
      this.context.state = state;
    }
  }
}
