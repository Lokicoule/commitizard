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
 * @type RedGreenStore
 * @description
 * It is responsible for defining the store of the state machine.
 */
export type RedGreenStore = {
  message: string;
  type: RedGreenRefactorType;
};

/**
 * @type RedGreenContext
 * @description
 * It is responsible for defining the context of the state machine.
 * It is composed by the state and the store.
 * @see RedGreenRefactorState
 * @see RedGreenStore
 * @see RedGreenRefactorStateMachine
 */
export interface RedGreenContext {
  state: RedGreenRefactorState;
  store: RedGreenStore;
}
