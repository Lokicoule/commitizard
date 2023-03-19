import { WizardCommitStateMachineImpl } from "../../state-machine/impl/WizardCommitStateMachineImpl";
import {
  WizardCommitState,
  WizardCommitStateMachine,
} from "../../state-machine/WizardCommitStateMachine";
import { WizardCommitStateMachineFactory } from "../WizardCommitStateMachineFactory";

export class WizardCommitStateMachineFactoryImpl
  implements WizardCommitStateMachineFactory
{
  create(): WizardCommitStateMachine {
    return new WizardCommitStateMachineImpl(
      WizardCommitState.ADD_FILES_TO_COMMIT
    );
  }
}
