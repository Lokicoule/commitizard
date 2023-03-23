export interface GitManager {
  isInsideGitRepo(): Promise<boolean>;
  getFiles(): Promise<string[]>;
  getUnstagedFiles(): Promise<string[]>;
  getUntrackedFiles(): Promise<string[]>;
  getStagedFiles(): Promise<string[]>;
  addFiles(files: string[]): Promise<void>;
  commit(message: string): Promise<void>;
}
