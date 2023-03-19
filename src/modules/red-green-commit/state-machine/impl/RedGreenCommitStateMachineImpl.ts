import { CustomSubjectInputHandler } from "../../handlers/impl/CustomSubjectInputHandler";
import { FeatureSubjectInputHandler } from "../../handlers/impl/FeatureSubjectInputHandler";
import { PatternGroupSelectionHandler } from "../../handlers/impl/PatternGroupSelectionHandler";
import { PatternSubjectSelectionHandler } from "../../handlers/impl/PatternSubjectSelectionHandler";
import { TypeSelectionHandler } from "../../handlers/impl/TypeSelectionHandler";
import { RedGreenCommitHandler } from "../../handlers/RedGreenCommitHandler";
import {
  RedGreenCommitState,
  RedGreenCommitStateMachine,
  RedGreenCommitType,
} from "../RedGreenCommitStateMachine";

export type Store = {
  message: string;
  type: RedGreenCommitType;
};

export interface Context {
  state: RedGreenCommitState;
  store: Store;
}

const transitions: Record<RedGreenCommitState, RedGreenCommitState[]> = {
  [RedGreenCommitState.TYPE_SELECTION]: [
    RedGreenCommitState.PATTERN_SUBJECT_SELECTION,
  ],
  [RedGreenCommitState.PATTERN_SUBJECT_SELECTION]: [
    RedGreenCommitState.CUSTOM_SUBJECT_INPUT,
    RedGreenCommitState.FEATURE_SUBJECT_INPUT,
  ],
  [RedGreenCommitState.FEATURE_SUBJECT_INPUT]: [
    RedGreenCommitState.PATTERN_GROUP_SELECTION,
  ],
  [RedGreenCommitState.CUSTOM_SUBJECT_INPUT]: [],
  [RedGreenCommitState.PATTERN_GROUP_SELECTION]: [],
};

export class RedGreenCommitStateMachineImpl
  implements RedGreenCommitStateMachine
{
  private context: Context;
  private handlers: Record<RedGreenCommitState, RedGreenCommitHandler>;

  constructor(initialState: RedGreenCommitState) {
    this.context = {
      state: initialState,
      store: {
        message: "",
        type: "INITIAL",
      },
    };
    this.handlers = {
      [RedGreenCommitState.TYPE_SELECTION]: new TypeSelectionHandler(),
      [RedGreenCommitState.PATTERN_SUBJECT_SELECTION]:
        new PatternSubjectSelectionHandler(),
      [RedGreenCommitState.FEATURE_SUBJECT_INPUT]:
        new FeatureSubjectInputHandler(),
      [RedGreenCommitState.CUSTOM_SUBJECT_INPUT]:
        new CustomSubjectInputHandler(),
      [RedGreenCommitState.PATTERN_GROUP_SELECTION]:
        new PatternGroupSelectionHandler(),
    };
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

  public setType(type: RedGreenCommitType): void {
    this.context.store.type = type;
  }

  public getType(): RedGreenCommitType {
    return this.context.store.type;
  }

  private canTransitionTo(state: RedGreenCommitState): boolean {
    return transitions[this.context.state].includes(state);
  }

  private transitionTo(state: RedGreenCommitState): void {
    if (this.canTransitionTo(state)) {
      this.context.state = state;
    }
  }
}
