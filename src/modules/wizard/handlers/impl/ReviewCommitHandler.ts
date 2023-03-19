import { promptConfirm } from "../../../../libs/prompt";
import { BaseWizardCommitHandler } from "./BaseWizardCommitHandler";
import { yellow, green } from "picocolors";
import {
  WizardCommitStateMachine,
  WizardCommitState,
} from "../../state-machine/WizardCommitStateMachine";

export class ReviewCommitHandler extends BaseWizardCommitHandler {
  public async handle(
    wizard: WizardCommitStateMachine
  ): Promise<WizardCommitState | null> {
    const confirmCommit = await promptConfirm({
      defaultValue: true,
      message: `Commit message: \n\n${green(
        wizard.getMessage()
      )}\n\nDo you want to create this commit?`,
      abortMessage: `${yellow("✖")} Commit confirmation aborted!`,
    });

    if (!confirmCommit) {
      return null;
    }

    return WizardCommitState.CommitComplete;
  }
}
