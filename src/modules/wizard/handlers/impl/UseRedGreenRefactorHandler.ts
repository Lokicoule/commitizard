import { Configuration } from "../../../../core/config";
import { RedGreenRefactorStateMachineFactoryImpl } from "../../../red-green-refactor/factories/impl/RedGreenRefactorStateMachineFactoryImpl";
import { RedGreenRefactorFormatter } from "../../../red-green-refactor/formatter/RedGreenRefactorFormatter";
import {
  WizardCommitState,
  WizardCommitStateMachine,
} from "../../state-machine/WizardCommitStateMachine";
import { BaseWizardCommitHandler } from "./BaseWizardCommitHandler";

export class UseRedGreenRefactorHandler extends BaseWizardCommitHandler {
  public async handle(
    wizard: WizardCommitStateMachine
  ): Promise<WizardCommitState | null> {
    const stateMachine = new RedGreenRefactorStateMachineFactoryImpl().create(
      this.promptManager,
      this.configuration
    );

    await stateMachine.handleCommit();

    wizard.setMessage(
      RedGreenRefactorFormatter.format(
        stateMachine.getStore(),
        Configuration.getConfig()["red-green-refactor"]
      )
    );

    return WizardCommitState.REVIEW_COMMIT_MESSAGE;
  }
}
