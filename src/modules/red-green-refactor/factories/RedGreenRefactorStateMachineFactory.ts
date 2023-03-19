import { Config } from "../../../core/config";
import { PromptManager } from "../../../libs/prompt";
import { RedGreenRefactorStateMachine } from "../state-machine/RedGreenRefactorStateMachine";

/**
 * @interface RedGreenRefactorStateMachineFactory
 * @description
 * It's the factory responsible for creating a RedGreenRefactorStateMachine.
 */
export interface RedGreenRefactorStateMachineFactory {
  /**
   * @method create
   * @param {PromptManager} promptManager
   * @param {Config} configuration
   * @description
   * It is responsible for creating a RedGreenRefactorStateMachine.
   * @returns {RedGreenRefactorStateMachine}
   * @memberof RedGreenRefactorStateMachineFactory
   * @see RedGreenRefactorStateMachine
   * @see RedGreenRefactorStateMachineFactoryImpl
   */
  create(
    promptManager: PromptManager,
    configuration: Config
  ): RedGreenRefactorStateMachine;
}
