import { RedGreenRefactorType, RedGreenStore } from "../types";

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
   * @returns {Readonly<RedGreenStore>}
   * @memberof RedGreenRefactorStateMachine
   * @see RedGreenStore
   */
  getStore(): Readonly<RedGreenStore>;

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
