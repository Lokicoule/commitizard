import { Config } from "../../../core/config";
import { PromptManager } from "../../../libs/prompt";
import { WizardCommitStateMachineImpl } from "../state-machine/impl/WizardCommitStateMachineImpl";
import {
  WizardCommitState,
  WizardCommitStateMachine,
} from "../state-machine/WizardCommitStateMachine";

export class WizardCommitStateMachineFactory {
  static create(
    configuration: Config,
    promptManager: PromptManager
  ): WizardCommitStateMachine {
    return new WizardCommitStateMachineImpl(
      WizardCommitState.ADD_FILES_TO_COMMIT,
      configuration,
      promptManager
    );
  }
}
