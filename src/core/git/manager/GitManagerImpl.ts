import { GitManagerOptions } from "../types/GitManagerOptions";
import { CommitMessageManager } from "./CommitMessageManager";
import { GitCommandRunner } from "./GitCommandRunner";
import { GitManager } from "../interfaces/GitManager";

export class GitManagerImpl implements GitManager {
  private options: GitManagerOptions;
  private gitCommandRunner: GitCommandRunner;
  private commitMessageManager: CommitMessageManager;

  private constructor(options: GitManagerOptions) {
    this.options = options;
    this.gitCommandRunner = new GitCommandRunner(options);
    this.commitMessageManager = new CommitMessageManager();
  }

  public static create(options: GitManagerOptions): GitManager {
    return new GitManagerImpl(options);
  }

  public async getStagedFiles(): Promise<string[]> {
    return this.gitCommandRunner.getStagedFiles();
  }

  public async getCreatedFiles(): Promise<string[]> {
    return this.gitCommandRunner.getCreatedFiles();
  }

  public async getUpdatedFiles(): Promise<string[]> {
    return this.gitCommandRunner.getUpdatedFiles();
  }

  public async getDeletedFiles(): Promise<string[]> {
    return this.gitCommandRunner.getDeletedFiles();
  }

  public async isGitRepository(): Promise<boolean> {
    return this.gitCommandRunner.isGitRepository();
  }

  public async hasStagedFiles(): Promise<boolean> {
    return this.gitCommandRunner.hasStagedFiles();
  }

  public async stageFiles(files: string[]): Promise<void> {
    return this.gitCommandRunner.stageFiles(files);
  }

  public async commit(message: string): Promise<void> {
    if (this.options.fromHook) {
      await this.commitMessageManager.commitFromHook(message);
    } else {
      await this.gitCommandRunner.commitWithoutHook(message);
    }
  }
}
