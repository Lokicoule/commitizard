import { bgGreen, green, red } from "picocolors";
import { WizardCommitBuilder } from "../../builder/WizardCommit";
import { BaseWizardCommitHandler } from "../BaseWizardCommitHandler";

/**
 * @class WizardCommitRunnerHandler
 * @extends {BaseWizardCommitHandler}
 * @implements {WizardCommitHandler}
 * @description
 * This handler is responsible for running the git commit process.
 */
export class WizardCommitRunnerHandler extends BaseWizardCommitHandler {
  protected async processInput(
    commitBuilder: WizardCommitBuilder
  ): Promise<void> {
    let outroMessage = `${green("✔")} ${bgGreen(
      " Commit created successfully!"
    )}`;
    try {
      await this.gitManager.commit(commitBuilder.build().message);
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
    }
  }
}
