import { CustomSubjectInputHandler } from "../../handlers/impl/CustomSubjectInputHandler";
import { FeatureSubjectInputHandler } from "../../handlers/impl/FeatureSubjectInputHandler";
import { PatternGroupSelectionHandler } from "../../handlers/impl/PatternGroupSelectionHandler";
import { PatternSubjectSelectionHandler } from "../../handlers/impl/PatternSubjectSelectionHandler";
import { TypeSelectionHandler } from "../../handlers/impl/TypeSelectionHandler";
import { RedGreenRefactorHandler } from "../../handlers/RedGreenRefactorHandler";
import {
  RedGreenRefactorState,
  RedGreenRefactorStateMachine,
  RedGreenRefactorType,
} from "../RedGreenRefactorStateMachine";

export type Store = {
  message: string;
  type: RedGreenRefactorType;
};

export interface Context {
  state: RedGreenRefactorState;
  store: Store;
}

/**
 * The transitions of the state machine.
 * The key is the current state, and the value is the list of possible next states.
 * The list of possible next states is used to determine if a transition is valid.
 */
const transitions: Record<RedGreenRefactorState, RedGreenRefactorState[]> = {
  [RedGreenRefactorState.TYPE_SELECTION]: [
    RedGreenRefactorState.PATTERN_SUBJECT_SELECTION,
  ],
  [RedGreenRefactorState.PATTERN_SUBJECT_SELECTION]: [
    RedGreenRefactorState.CUSTOM_SUBJECT_INPUT,
    RedGreenRefactorState.FEATURE_SUBJECT_INPUT,
  ],
  [RedGreenRefactorState.FEATURE_SUBJECT_INPUT]: [
    RedGreenRefactorState.PATTERN_GROUP_SELECTION,
  ],
  [RedGreenRefactorState.CUSTOM_SUBJECT_INPUT]: [],
  [RedGreenRefactorState.PATTERN_GROUP_SELECTION]: [],
};

export class RedGreenRefactorStateMachineImpl
  implements RedGreenRefactorStateMachine
{
  private context: Context;
  private handlers: Record<RedGreenRefactorState, RedGreenRefactorHandler>;

  constructor(initialState: RedGreenRefactorState) {
    this.context = {
      state: initialState,
      store: {
        message: "",
        type: "INITIAL",
      },
    };
    this.handlers = {
      [RedGreenRefactorState.TYPE_SELECTION]: new TypeSelectionHandler(),
      [RedGreenRefactorState.PATTERN_SUBJECT_SELECTION]:
        new PatternSubjectSelectionHandler(),
      [RedGreenRefactorState.FEATURE_SUBJECT_INPUT]:
        new FeatureSubjectInputHandler(),
      [RedGreenRefactorState.CUSTOM_SUBJECT_INPUT]:
        new CustomSubjectInputHandler(),
      [RedGreenRefactorState.PATTERN_GROUP_SELECTION]:
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

  public setType(type: RedGreenRefactorType): void {
    this.context.store.type = type;
  }

  public getType(): RedGreenRefactorType {
    return this.context.store.type;
  }

  private canTransitionTo(state: RedGreenRefactorState): boolean {
    return transitions[this.context.state].includes(state);
  }

  private transitionTo(state: RedGreenRefactorState): void {
    if (this.canTransitionTo(state)) {
      this.context.state = state;
    }
  }
}
