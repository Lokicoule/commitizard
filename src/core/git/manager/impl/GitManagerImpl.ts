import { ProcessBuilderFactory } from "~/core/process/builder/ProcessBuilderFactory";
import { GitManagerOptions } from "../../types";
import { GitManager } from "../GitManager";

export class GitManagerImpl implements GitManager {
  private options: GitManagerOptions;

  constructor(options: GitManagerOptions) {
    this.options = options;
  }

  public async isInsideGitRepo(): Promise<boolean> {
    const process = ProcessBuilderFactory.create()
      .addArg("rev-parse")
      .addArg("--is-inside-work-tree");

    const gitProcess = process.spawn("git");
    const stdout = await this.streamToString(gitProcess.stdout);

    return Boolean(stdout);
  }

  public async getFiles(): Promise<string[]> {
    const unstagedFiles = await this.getUnstagedFiles();
    const untrackedFiles = await this.getUntrackedFiles();
    const stagedFiles = await this.getStagedFiles();

    return (
      [...unstagedFiles, ...untrackedFiles].filter(
        (file) => !stagedFiles.includes(file)
      ) ?? []
    );
  }

  public async getUnstagedFiles(): Promise<string[]> {
    const process = ProcessBuilderFactory.create()
      .addArg("diff")
      .addArg("--name-only");
    this.options.exclude.forEach((file) => process.addArg(`:(exclude)${file}`));

    const gitProcess = process.spawn("git");
    return (
      (await this.streamToString(gitProcess.stdout))
        .split("\n")
        .filter(Boolean) ?? []
    );
  }

  public async getUntrackedFiles(): Promise<string[]> {
    const gitProcessBuilder = ProcessBuilderFactory.create()
      .addArg("ls-files")
      .addArg("--others");
    if (this.options.exclude.length > 0) {
      gitProcessBuilder.addArg("--exclude-standard");
      this.options.exclude.forEach((file) =>
        gitProcessBuilder.addArg(`:(exclude)${file}`)
      );
    }
    const gitProcess = gitProcessBuilder.spawn("git");
    return (
      (await this.streamToString(gitProcess.stdout))
        .split("\n")
        .filter(Boolean) ?? []
    );
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

  public async addFiles(files: string[]): Promise<void> {
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
