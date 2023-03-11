import { outro } from "@clack/prompts";
import pc from "picocolors";
import { CommitBuilder } from "../../commit";
import { GitProcessBuilderFactory } from "../../git/process/factory/git-process-builder-factory";
import { PromptHelper } from "../../prompt/prompt-helper";
import { CommitHandler } from "./commit-handler";

const SUCCESS_MESSAGE =
  pc.green("✔") + pc.bgGreen(" Commit created successfully!");
const ABORT_MESSAGE = pc.yellow("✖") + " Commit confirmation aborted!";
const ERROR_MESSAGE =
  pc.red("✖") + " An error occurred while creating the commit!";

export class CommitConfirmHandler extends CommitHandler {
  public async handle(commitBuilder: CommitBuilder): Promise<void> {
    await this.processInput(commitBuilder);
    await super.handle(commitBuilder);
  }

  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    const commit = commitBuilder.build();
    const confirmCommit = await PromptHelper.promptConfirm({
      defaultValue: true,
      message: `Commit message: \n\n${pc.green(
        commit.toString()
      )}\n\nDo you want to create this commit?`,
      abortMessage: ABORT_MESSAGE,
    });

    if (confirmCommit) {
      try {
        GitProcessBuilderFactory.create()
          .addArg("commit")
          .addArg("-m")
          .addArg(commit.toString())
          .spawn();
        outro(SUCCESS_MESSAGE);
      } catch (error) {
        error instanceof Error &&
          outro(ERROR_MESSAGE + pc.red(`\n${error.message}`));
      }
    } else {
      outro(ABORT_MESSAGE);
    }
  }
}
