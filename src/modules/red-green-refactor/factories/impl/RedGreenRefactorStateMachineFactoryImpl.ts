import { RedGreenRefactorStateMachineImpl } from "../../state-machine/impl/RedGreenRefactorStateMachineImpl";
import {
  RedGreenRefactorState,
  RedGreenRefactorStateMachine,
} from "../../state-machine/RedGreenRefactorStateMachine";
import { RedGreenRefactorStateMachineFactory } from "../RedGreenRefactorStateMachineFactory";

export class RedGreenRefactorStateMachineFactoryImpl
  implements RedGreenRefactorStateMachineFactory
{
  create(): RedGreenRefactorStateMachine {
    return new RedGreenRefactorStateMachineImpl(
      RedGreenRefactorState.TYPE_SELECTION
    );
  }
}
