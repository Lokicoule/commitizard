import { outro } from "@clack/prompts";
import pc from "picocolors";
import { CommitBuilder } from "../../../commit";
import { defaultConfig } from "../../../config";
import { GitProcessBuilderFactory } from "../../../git";
import { logMessage, promptConfirm } from "../../../prompt";
import { CommitConfirmHandler } from "../CommitConfirmHandler";
import { CommitHandler } from "../CommitHandler";

const SUCCESS_MESSAGE = `${pc.green("✔")} ${pc.bgGreen(
  " Commit created successfully!"
)}`;
const ABORT_MESSAGE = `${pc.yellow("✖")} Commit confirmation aborted!`;
const ERROR_MESSAGE = `${pc.red(
  "✖"
)} An error occurred while creating the commit!`;

export class CommitConfirmHandlerImpl
  extends CommitHandler
  implements CommitConfirmHandler
{
  private messageFormat: string = defaultConfig.commitOptions.format;

  public async handle(commitBuilder: CommitBuilder): Promise<void> {
    await this.processInput(commitBuilder);
    await super.handle(commitBuilder);
  }

  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    let commit = commitBuilder.build();

    if (commit.isEmpty()) {
      logMessage(
        "Commit message is empty, should never happen, please report!",
        "error"
      );
      return;
    }

    const commitMessage = commit.format(this.messageFormat);
    const confirmCommit = await promptConfirm({
      defaultValue: true,
      message: `Commit message: \n\n${pc.green(
        commitMessage
      )}\n\nDo you want to create this commit?`,
      abortMessage: ABORT_MESSAGE,
    });

    if (confirmCommit) {
      try {
        GitProcessBuilderFactory.create()
          .addArg("commit")
          .addArg("-m")
          .addArg(commitMessage)
          .spawn();
        outro(SUCCESS_MESSAGE);
      } catch (error: any) {
        outro(`${ERROR_MESSAGE} ${pc.red(`\n${error.message}`)}`);
      }
    } else {
      outro(ABORT_MESSAGE);
    }
  }

  public setMessageFormat(messageFormat: string): CommitConfirmHandler {
    this.messageFormat = messageFormat;
    return this;
  }
}
