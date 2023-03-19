import { CommitBuilderFactoryImpl } from "../../../commit/factory/impl/CommitBuilderFactoryImpl";
import { ConventionalCommitFormatter } from "../../../conventional-commit/formatter/ConventionalCommitFormatter";
import { RedGreenCommitStateMachineFactoryImpl } from "../../../red-green-commit/factories/impl/RedGreenCommitStateMachineFactoryImpl";
import { RedGreenCommitFormatter } from "../../../red-green-commit/formatter/RedGreenCommitFormatter";
import {
  WizardCommitState,
  WizardCommitStateMachine,
} from "../../state-machine/WizardCommitStateMachine";
import { BaseWizardCommitHandler } from "./BaseWizardCommitHandler";

export class UseRedGreenCommitHandler extends BaseWizardCommitHandler {
  public async handle(
    wizard: WizardCommitStateMachine
  ): Promise<WizardCommitState | null> {
    const stateMachine = new RedGreenCommitStateMachineFactoryImpl().create();

    await stateMachine.handleCommit();

    wizard.setMessage(RedGreenCommitFormatter.format(stateMachine));

    return WizardCommitState.REVIEW_COMMIT_MESSAGE;
  }
}
