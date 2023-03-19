import { RedGreenRefactorStateMachineImpl } from "../state-machine/impl/RedGreenRefactorStateMachineImpl";
import { RedGreenRefactorStateMachine } from "../state-machine/RedGreenRefactorStateMachine";
import { PromptManager } from "../../../libs/prompt/PromptManager";
import { Config } from "../../../core/config";
import { RedGreenRefactorState } from "../types";

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
export class RedGreenRefactorStateMachineFactory {
  static create(
    promptManager: PromptManager,
    configuration: Config
  ): RedGreenRefactorStateMachine {
    return new RedGreenRefactorStateMachineImpl(
      RedGreenRefactorState.TYPE_SELECTION,
      configuration,
      promptManager
    );
  }
}
