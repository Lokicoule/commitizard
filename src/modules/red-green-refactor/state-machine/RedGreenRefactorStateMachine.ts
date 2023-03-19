import { Store } from "./impl/RedGreenRefactorStateMachineImpl";

/**
 * @enum RedGreenRefactorState
 * @description
 * It is responsible for defining the states of the state machine.
 */
export enum RedGreenRefactorState {
  CUSTOM_SUBJECT_INPUT = "custom_subject_input",
  PATTERN_GROUP_SELECTION = "pattern_group_selection",
  PATTERN_SUBJECT_SELECTION = "pattern_subject_selection",
  FEATURE_SUBJECT_INPUT = "feature_subject_input",
  TYPE_SELECTION = "type_selection",
}

/**
 * @type RedGreenRefactorTypeLowercase
 * @description
 * It is responsible for defining the type of the refactor.
 * It is a union of the lowercase types.
 */
export type RedGreenRefactorTypeLowercase =
  | "red"
  | "green"
  | "refactor"
  | "initial";

/**
 * @type RedGreenRefactorTypeUppercase
 * @description
 * It is responsible for defining the type of the refactor.
 * It is a union of the uppercase types.
 */
export type RedGreenRefactorTypeUppercase =
  | "RED"
  | "GREEN"
  | "REFACTOR"
  | "INITIAL";

/**
 * @type RedGreenRefactorType
 * @description
 * It is responsible for defining the type of the refactor.
 * It is a union of the lowercase and uppercase types.
 * @see RedGreenRefactorTypeLowercase
 * @see RedGreenRefactorTypeUppercase
 */
export type RedGreenRefactorType =
  | RedGreenRefactorTypeLowercase
  | RedGreenRefactorTypeUppercase;

/**
 * @name RedGreenRefactorStateMachine
 * @description
 * It is responsible for handling the state transitions and delegating the handling of the state to the appropriate handler.
 * The state machine is responsible for keeping track of the current state and the store.
 * The store is a place where the state machine can store data that is shared between states.
 * The state machine is also responsible for validating the transitions.
 * It is not responsible for the logic of the states.
 */
export interface RedGreenRefactorStateMachine {
  /**
   * @method handleCommit
   * @description
   * It is responsible for handling the commit.
   * It is also responsible for delegating the handling of the next state to the next handler.
   * @returns {Promise<void>}
   * @memberof RedGreenRefactorStateMachine
   * @see RedGreenRefactorHandler
   */
  handleCommit(): Promise<void>;

  /**
   * @method getStore
   * @description
   * It is responsible for getting the store.
   * @returns {Readonly<Store>}
   * @memberof RedGreenRefactorStateMachine
   * @see Store
   */
  getStore(): Readonly<Store>;

  /**
   * @method setMessage
   * @description
   * It is responsible for setting the message.
   * @param {string} message
   * @memberof RedGreenRefactorStateMachine
   */
  setMessage(message: string): void;

  /**
   * @method getMessage
   * @description
   * It is responsible for getting the message.
   * @returns {string}
   * @memberof RedGreenRefactorStateMachine
   */
  getMessage(): string;

  /**
   * @method setType
   * @description
   * It is responsible for setting the type.
   * @param {RedGreenRefactorType} type
   * @memberof RedGreenRefactorStateMachine
   * @see RedGreenRefactorType
   */
  setType(type: Omit<RedGreenRefactorType, "INITIAL" | "initial">): void;

  /**
   * @method getType
   * @description
   * It is responsible for getting the type.
   * @returns {RedGreenRefactorType}
   * @memberof RedGreenRefactorStateMachine
   * @see RedGreenRefactorType
   */
  getType(): RedGreenRefactorType;
}
