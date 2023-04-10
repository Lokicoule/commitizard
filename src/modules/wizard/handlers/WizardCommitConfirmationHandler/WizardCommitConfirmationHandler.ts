import { green, yellow } from "picocolors";
import { WizardBuilder } from "../../builder";
import { BaseWizardCommitHandler } from "../BaseWizardCommitHandler";

/**
 * @class WizardCommitConfirmationHandler
 * @extends {BaseWizardCommitHandler}
 * @implements {WizardCommitHandler}
 * @description
 * This handler is responsible for confirming the commit message.
 */
export class WizardCommitConfirmationHandler extends BaseWizardCommitHandler {
  protected async processInput(commitBuilder: WizardBuilder): Promise<void> {
    const confirmCommit = await this.promptManager.confirm({
      defaultValue: true,
      message: `Commit message: \n\n${green(
        commitBuilder.build().message
      )}\n\nDo you want to create this commit?`,
      abortMessage: `${yellow("✖")} Commit confirmation aborted!`,
    });

    if (!confirmCommit) {
      this.promptManager.log.warn(`${yellow("✖")} Commit creation aborted!`);
      this.abort();
    }
  }
}
