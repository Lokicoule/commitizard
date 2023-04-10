import { promises as fs } from "fs";
import { COMMIT_MSG_TMP_PATH } from "../constants";

export class CommitMessageManager {
  public async commitFromHook(message: string): Promise<void> {
    console.info("message from hook: ", message);
    try {
      const tempCommitMsgFile = `${COMMIT_MSG_TMP_PATH}.tmp`;

      await this.writeFileWithMessage(tempCommitMsgFile, message);
      await this.ensureCommitMsgFileExists();
      await this.appendExistingMessage(tempCommitMsgFile);
      await this.renameTempCommitFile(tempCommitMsgFile);
    } catch (error) {
      console.error("error: ", error);
    }
  }

  private async writeFileWithMessage(
    filePath: string,
    message: string
  ): Promise<void> {
    await fs.writeFile(filePath, message, { encoding: "utf8" });
  }

  private async ensureCommitMsgFileExists(): Promise<void> {
    try {
      await fs.access(COMMIT_MSG_TMP_PATH);
    } catch (error) {
      const typedError = error as NodeJS.ErrnoException;
      if (typedError?.code === "ENOENT") {
        await fs.writeFile(COMMIT_MSG_TMP_PATH, "", { encoding: "utf8" });
      } else {
        throw typedError;
      }
    }
  }

  private async appendExistingMessage(
    tempCommitMsgFile: string
  ): Promise<void> {
    const existingMessage = await fs.readFile(COMMIT_MSG_TMP_PATH, {
      encoding: "utf8",
    });
    await fs.appendFile(tempCommitMsgFile, existingMessage);
  }

  private async renameTempCommitFile(tempCommitMsgFile: string): Promise<void> {
    await fs.rename(tempCommitMsgFile, COMMIT_MSG_TMP_PATH);
  }
}
