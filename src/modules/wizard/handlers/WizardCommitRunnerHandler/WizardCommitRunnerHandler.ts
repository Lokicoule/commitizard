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
    try {
      const isValid = await this.validate();

      if (!isValid) {
        console.log("Aborting...");
        this.processAbort();
        return;
      }

      const commit = commitBuilder.build();
      await this.gitManager.commit(commit.message);

      this.promptManager.outro({
        message: `${green("✔")} ${bgGreen(" Commit created successfully!")}`,
      });
    } catch (error: any) {
      this.promptManager.outro({
        message: `${red(
          "✖"
        )} An error occurred while creating the commit! ${red(
          `\n${error.message}`
        )}`,
      });
    }
  }

  private async validate(): Promise<boolean> {
    const isGitRepository = await this.gitManager.isGitRepository();
    const hasStagedFiles = await this.gitManager.hasStagedFiles();

    if (!isGitRepository) {
      this.promptManager.log.error(
        `${red(
          "✖"
        )} You are not inside a git repository!\nPlease, initialize a git repository and try again.`
      );
      return false;
    }

    if (!hasStagedFiles) {
      this.promptManager.log.error(
        `${red(
          "✖"
        )} You have no staged files!\nPlease, stage the files you want to commit and try again.`
      );
      return false;
    }

    return true;
  }

  private processAbort(): void {
    this.abort();
    this.promptManager.outro({
      message: `${red("✖")} Commit creation aborted!`,
    });
  }
}
