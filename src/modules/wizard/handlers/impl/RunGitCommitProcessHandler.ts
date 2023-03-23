import { bgGreen, green, red } from "picocolors";
import {
  WizardCommitState,
  WizardCommitStateMachine,
} from "../../state-machine/WizardCommitStateMachine";
import { BaseWizardCommitHandler } from "./BaseWizardCommitHandler";

export class RunGitCommitProcessHandler extends BaseWizardCommitHandler {
  public async handle(
    wizard: WizardCommitStateMachine
  ): Promise<WizardCommitState | null> {
    let outroMessage = `${green("✔")} ${bgGreen(
      " Commit created successfully!"
    )}`;
    try {
      await this.gitManager.commit(wizard.getMessage());
    } catch (error: any) {
      outroMessage = `${red(
        "✖"
      )} An error occurred while creating the commit! ${red(
        `\n${error.message}`
      )}`;
    } finally {
      this.promptManager.outro({
        message: outroMessage,
      });
      return null;
    }
  }
}
