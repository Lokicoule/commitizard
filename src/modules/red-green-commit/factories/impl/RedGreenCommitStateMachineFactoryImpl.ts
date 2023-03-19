import { RedGreenCommitStateMachineImpl } from "../../state-machine/impl/RedGreenCommitStateMachineImpl";
import {
  RedGreenCommitState,
  RedGreenCommitStateMachine,
} from "../../state-machine/RedGreenCommitStateMachine";
import { RedGreenCommitStateMachineFactory } from "../RedGreenCommitStateMachineFactory";

export class RedGreenCommitStateMachineFactoryImpl
  implements RedGreenCommitStateMachineFactory
{
  create(): RedGreenCommitStateMachine {
    return new RedGreenCommitStateMachineImpl(
      RedGreenCommitState.TYPE_SELECTION
    );
  }
}
