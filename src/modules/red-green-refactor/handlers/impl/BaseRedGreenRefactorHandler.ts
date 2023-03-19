import {
  RedGreenRefactorState,
  RedGreenRefactorStateMachine,
} from "../../state-machine/RedGreenRefactorStateMachine";
import { RedGreenRefactorHandler } from "../RedGreenRefactorHandler";

/**
 * @class BaseRedGreenRefactorHandler
 * @implements RedGreenRefactorHandler
 * @description
 * It is responsible for handling a specific state.
 * It is also responsible for delegating the handling of the next state to the next handler.
 * It is an abstract class that implements the common logic of the handlers.
 * It is not responsible for the logic of the states.
 * @returns {RedGreenRefactorState | null}
 */
export abstract class BaseRedGreenRefactorHandler
  implements RedGreenRefactorHandler
{
  private nextHandler: RedGreenRefactorHandler | null = null;

  /**
   * @name setNext
   * @description
   * It is responsible for delegating the handling of the next state to the next handler.
   * @param {RedGreenRefactorHandler} handler
   * @returns {RedGreenRefactorHandler}
   * @memberof BaseRedGreenRefactorHandler
   * @see RedGreenRefactorHandler
   */
  public setNext(handler: RedGreenRefactorHandler): RedGreenRefactorHandler {
    this.nextHandler = handler;
    return handler;
  }

  /**
   * @name handle
   * @description
   * It is responsible for handling a specific state.
   * It is also responsible for delegating the handling of the next state to the next handler.
   * @param {RedGreenRefactorStateMachine} stateMachine
   * @returns {RedGreenRefactorState | null}
   * @memberof BaseRedGreenRefactorHandler
   * @see RedGreenRefactorHandler
   * @see RedGreenRefactorStateMachine
   */
  public async handle(
    stateMachine: RedGreenRefactorStateMachine
  ): Promise<RedGreenRefactorState | null> {
    if (this.nextHandler) {
      return await this.nextHandler.handle(stateMachine);
    }
    return null;
  }
}
