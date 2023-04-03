import { bgGreen, red } from "picocolors";
import { WizardCommitBuilder } from "../../builder/WizardCommitBuilder";
import { WizardCommit } from "../../types";
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
      const commit = commitBuilder.build();
      const isValid = await this.validate(commit);

      if (!isValid) {
        this.processAbort();
        return;
      }

      if (commit.files.length > 0) {
        await this.gitManager.stageFiles(commit.files);
      }

      await this.gitManager.commit(commit.message);

      this.promptManager.outro({
        message: `${bgGreen("✔ Commit created successfully!")}`,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.promptManager.outro({
          message: `${red(
            "✖"
          )} An error occurred while creating the commit! ${red(
            `\n${error.message}`
          )}`,
        });
      }
    }
  }

  private async validate(commit: WizardCommit): Promise<boolean> {
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

    if (!hasStagedFiles && commit.files.length === 0) {
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
