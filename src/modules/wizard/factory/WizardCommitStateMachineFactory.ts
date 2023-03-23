import { ConfigurationManager } from "~/core/configuration";
import { GitManager } from "~/core/git";
import { PromptManager } from "~/core/prompt";
import { WizardCommitStateMachineImpl } from "../state-machine/impl/WizardCommitStateMachineImpl";
import {
  WizardCommitState,
  WizardCommitStateMachine,
} from "../state-machine/WizardCommitStateMachine";

export class WizardCommitStateMachineFactory {
  static create(
    configuration: ConfigurationManager,
    promptManager: PromptManager,
    gitManager: GitManager
  ): WizardCommitStateMachine {
    return new WizardCommitStateMachineImpl(
      WizardCommitState.ADD_FILES_TO_COMMIT,
      configuration,
      promptManager,
      gitManager
    );
  }
}
