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
    const confirmCommit = await this.promptManager.confirm({
      defaultValue: true,
      message: `Commit message: \n\n${green(
        wizard.getMessage()
      )}\n\nDo you want to create this commit?`,
      abortMessage: `${yellow("✖")} Commit confirmation aborted!`,
    });

    if (!confirmCommit) {
      this.promptManager.log.warn(`${yellow("✖")} Commit creation aborted!`);
      return null;
    }

    return WizardCommitState.RUN_GIT_COMMIT_PROCESS;
  }
}
