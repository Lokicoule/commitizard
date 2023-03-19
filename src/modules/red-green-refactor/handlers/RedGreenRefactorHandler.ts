import {
  RedGreenRefactorState,
  RedGreenRefactorStateMachine,
} from "../state-machine/RedGreenRefactorStateMachine";

/**
 * @interface RedGreenRefactorHandler
 * @description
 * It is responsible for handling a specific state.
 * It is also responsible for delegating the handling of the next state to the next handler.
 */
export interface RedGreenRefactorHandler {
  /**
   * @method setNext
   * @description
   * It is responsible for delegating the handling of the next state to the next handler.
   * @param {RedGreenRefactorHandler} handler
   * @returns {RedGreenRefactorHandler}
   * @memberof BaseRedGreenRefactorHandler
   * @see RedGreenRefactorHandler
   */
  setNext(handler: RedGreenRefactorHandler): RedGreenRefactorHandler;

  /**
   * @method handle
   * @description
   * It is responsible for handling a specific state.
   * It is also responsible for delegating the handling of the next state to the next handler.
   * @param {RedGreenRefactorStateMachine} stateMachine
   * @returns {RedGreenRefactorState | null}
   * @memberof BaseRedGreenRefactorHandler
   * @see RedGreenRefactorHandler
   * @see RedGreenRefactorStateMachine
   */
  handle(
    stateMachine: RedGreenRefactorStateMachine
  ): Promise<RedGreenRefactorState | null>;
}
