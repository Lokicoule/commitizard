import { RedGreenRefactorStateMachine } from "../state-machine/RedGreenRefactorStateMachine";

/**
 * @interface RedGreenRefactorStateMachineFactory
 * @description
 * It's the factory responsible for creating a RedGreenRefactorStateMachine.
 */
export interface RedGreenRefactorStateMachineFactory {
  /**
   * @method create
   * @description
   * It is responsible for creating a RedGreenRefactorStateMachine.
   * @returns {RedGreenRefactorStateMachine}
   * @memberof RedGreenRefactorStateMachineFactory
   * @see RedGreenRefactorStateMachine
   * @see RedGreenRefactorStateMachineFactoryImpl
   */
  create(): RedGreenRefactorStateMachine;
}
