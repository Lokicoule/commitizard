import { ProcessBuilderFactory } from "~/core/process/builder/ProcessBuilderFactory";
import { GitManagerOptions } from "../../types";
import { GitManager } from "../GitManager";

export class GitManagerImpl implements GitManager {
  private options: GitManagerOptions;

  constructor(options: GitManagerOptions) {
    this.options = options;
  }

  public async getStagedFiles(): Promise<string[]> {
    return await this.getFiles(["diff", "--cached", "--name-only"]);
  }

  public async getCreatedFiles(): Promise<string[]> {
    const cmdResult = await this.runGitCommand(["status", "--porcelain"]);
    const lines = cmdResult.trim().split(/\r?\n/);
    return lines
      .filter((line) => line.startsWith("??"))
      .map((line) => line.substring(3));
  }

  public async getUpdatedFiles(): Promise<string[]> {
    return await this.getFiles(["diff", "--name-only", "--diff-filter=M"]);
  }

  public async getDeletedFiles(): Promise<string[]> {
    return await this.getFiles(["diff", "--name-only", "--diff-filter=D"]);
  }

  public async isGitRepository(): Promise<boolean> {
    const result = await this.runGitCommand([
      "rev-parse",
      "--is-inside-work-tree",
    ]);

    return Boolean(result);
  }

  public async hasStagedFiles(): Promise<boolean> {
    const stagedFiles = await this.getStagedFiles();

    return Boolean(stagedFiles);
  }

  public async stageFiles(files: string[]): Promise<void> {
    await this.runGitCommand(["add", ...files]);
  }

  public async commit(message: string): Promise<void> {
    await this.runGitCommand(["commit", "-m", message]);
  }

  public async runGitCommand(command: string[]): Promise<string> {
    const process = ProcessBuilderFactory.create()
      .addArgs(command)
      .spawn("git");
    return await this.streamToString(process.stdout);
  }

  private async getFiles(command: string[]): Promise<string[]> {
    const fileList = await this.runGitCommand([
      ...command,
      ...this.getExcludedOptions(),
    ]);
    return fileList.split("\n").filter(Boolean);
  }

  private getExcludedOptions(): string[] {
    return this.options.exclude.map((file) => `:(exclude)${file}`);
  }

  private async streamToString(
    stream: NodeJS.ReadableStream,
    encoding: BufferEncoding = "utf8"
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      let data = "";
      stream.on("data", (chunk) => {
        data += chunk.toString(encoding);
      });
      stream.on("end", () => {
        resolve(data);
      });
      stream.on("error", (error) => {
        reject(error);
      });
    });
  }
}
