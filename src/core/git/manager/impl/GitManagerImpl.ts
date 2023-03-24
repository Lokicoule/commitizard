import { ProcessBuilderFactory } from "~/core/process/builder/ProcessBuilderFactory";
import { GitManagerOptions } from "../../types";
import { GitManager } from "../GitManager";

export class GitManagerImpl implements GitManager {
  private options: GitManagerOptions;

  constructor(options: GitManagerOptions) {
    this.options = options;
  }

  public async isGitRepository(): Promise<boolean> {
    const process = ProcessBuilderFactory.create()
      .addArg("rev-parse")
      .addArg("--is-inside-work-tree");

    const gitProcess = process.spawn("git");
    const stdout = await this.streamToString(gitProcess.stdout);

    return Boolean(stdout);
  }

  public async getStagedFiles(): Promise<string[]> {
    const process = ProcessBuilderFactory.create()
      .addArg("diff")
      .addArg("--cached")
      .addArg("--name-only");
    this.options.exclude.forEach((file) => process.addArg(`:(exclude)${file}`));

    const gitProcess = process.spawn("git");
    return (
      (await this.streamToString(gitProcess.stdout))
        .split("\n")
        .filter(Boolean) ?? []
    );
  }

  public async getStagedDiff(): Promise<string[]> {
    const process = ProcessBuilderFactory.create()
      .addArg("diff")
      .addArg("--cached")
      .addArg("--name-only");
    this.options.exclude.forEach((file) => process.addArg(`:(exclude)${file}`));

    const gitProcess = process.spawn("git");
    return (
      (await this.streamToString(gitProcess.stdout))
        .split("\n")
        .filter(Boolean) ?? []
    );
  }

  public async stageFiles(files: string[]): Promise<void> {
    const process = ProcessBuilderFactory.create()
      .addArgs(["add", ...files])
      .spawn("git");
    await this.streamToString(process.stdout);
  }

  public async commit(message: string): Promise<void> {
    const process = ProcessBuilderFactory.create()
      .addArgs(["commit", "-m", message])
      .spawn("git");
    await this.streamToString(process.stdout);
  }

  public async hasStagedFiles(): Promise<boolean> {
    const process = ProcessBuilderFactory.create()
      .addArg("diff")
      .addArg("--cached")
      .addArg("--name-only");
    this.options.exclude.forEach((file) => process.addArg(`:(exclude)${file}`));

    const gitProcess = process.spawn("git");
    const stdout = await this.streamToString(gitProcess.stdout);

    return Boolean(stdout);
  }

  public async getCreatedFiles(): Promise<string[]> {
    const process = ProcessBuilderFactory.create()
      .addArg("diff")
      .addArg("--name-only")
      .addArg("--diff-filter=A");
    this.options.exclude.forEach((file) => process.addArg(`:(exclude)${file}`));

    const gitProcess = process.spawn("git");
    return (
      (await this.streamToString(gitProcess.stdout))
        .split("\n")
        .filter(Boolean) ?? []
    );
  }

  public async getUpdatedFiles(): Promise<string[]> {
    const process = ProcessBuilderFactory.create()
      .addArg("diff")
      .addArg("--name-only")
      .addArg("--diff-filter=M");
    this.options.exclude.forEach((file) => process.addArg(`:(exclude)${file}`));

    const gitProcess = process.spawn("git");
    return (
      (await this.streamToString(gitProcess.stdout))
        .split("\n")
        .filter(Boolean) ?? []
    );
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
