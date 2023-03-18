/* import { intro, spinner } from "@clack/prompts";
import { Command } from "commander";
import { loadConfig } from "../../../../core/config/configUtils";
import {
  getStagedDiff,
  getStagedFiles,
  isInsideGitRepo,
} from "../../../../libs/git";
import { SmartCommitCommand } from "../SmartCommitCommand";
import { sanitize } from "../../../../libs/openai/sanitize";
import { logMessage } from "../../../../libs/prompt";
import { createCompletion } from "../../../../libs/openai";
import { Config } from "../../../../core/config";

export class SmartCommitCommandImpl
  extends Command
  implements SmartCommitCommand
{
  private config!: Config;

  constructor() {
    super();
  }

  async run(configPath?: string): Promise<void> {
    intro("GitHub Commit Message SmartCommit");

    this.config = loadConfig(configPath);

    if (!(await isInsideGitRepo())) {
      logMessage("You are not inside a git repository", "error");
      return;
    }
    const stagedFiles = await getStagedFiles();
    if (!stagedFiles) {
      logMessage("Nothing to commit", "warn");
      return;
    }

    let diff = await getStagedDiff();
    //diff = sanitize(diff);

    await this.generateCommitMessage(diff);
  }

  private async generateCommitMessage(diff: string): Promise<void> {
    const types = this.config.commitOptions.types
      .map((type) => type.value)
      .join(",");
    // prompt message is shortened to reduce token usage
    let prompt = `Write a concise and insightful Git commit message in present tense for the given diff without any introductory statements. Available types:${types}.${diff}`;

    const commitMessage = await createCompletion(prompt);
    console.log(commitMessage);

    logMessage("Commit message generated");
  }
}
 */
