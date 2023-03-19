import { RedGreenRefactorStateMachineImpl } from "../../state-machine/impl/RedGreenRefactorStateMachineImpl";
import {
  RedGreenRefactorState,
  RedGreenRefactorStateMachine,
} from "../../state-machine/RedGreenRefactorStateMachine";
import { RedGreenRefactorStateMachineFactory } from "../RedGreenRefactorStateMachineFactory";
import { PromptManager } from "../../../../libs/prompt/PromptManager";
import { Config } from "../../../../core/config";

export class RedGreenRefactorStateMachineFactoryImpl
  implements RedGreenRefactorStateMachineFactory
{
  create(
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
