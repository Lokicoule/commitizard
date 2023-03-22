import { bgGreen, green, red } from "picocolors";
import { ProcessBuilderFactory } from "~/core/process/factory/ProcessBuilderFactory";
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
      ProcessBuilderFactory.create()
        .addArg("commit")
        .addArg("-m")
        .addArg(wizard.getMessage())
        .spawn("git");
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
