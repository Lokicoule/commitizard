import { ProcessBuilderFactory } from "~/core/process/builder/ProcessBuilderFactory";
import { GitManagerOptions } from "../../types";
import { GitManager } from "../GitManager";

export class GitManagerImpl implements GitManager {
  private options: GitManagerOptions;

  constructor(options: GitManagerOptions) {
    this.options = options;
  }

  public async getStagedFiles(): Promise<string[]> {
    const stagedFiles = await this.runGitCommand([
      "diff",
      "--cached",
      "--name-only",
      ...this.options.exclude.map((file) => `:(exclude)${file}`),
    ]);
    return stagedFiles.split("\n").filter(Boolean) ?? [];
  }

  public async getCreatedFiles(): Promise<string[]> {
    const cmdResult = await this.runGitCommand(["status", "--porcelain"]);
    const output = cmdResult.trim();
    const lines = output.split(/\r?\n/);
    const createdFiles: string[] = [];

    for (const line of lines) {
      if (line.startsWith("??")) {
        createdFiles.push(line.substring(3));
      }
    }

    return createdFiles;
  }

  public async getUpdatedFiles(): Promise<string[]> {
    const updatedFiles = await this.runGitCommand([
      "diff",
      "--name-only",
      "--diff-filter=M",
      ...this.options.exclude.map((file) => `:(exclude)${file}`),
    ]);

    return updatedFiles.split("\n").filter(Boolean) ?? [];
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
