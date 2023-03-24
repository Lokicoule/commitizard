export interface GitManager {
  isGitRepository(): Promise<boolean>;
  getStagedFiles(): Promise<string[]>;
  stageFiles(files: string[]): Promise<void>;
  commit(message: string): Promise<void>;
  hasStagedFiles(): Promise<boolean>;
  getCreatedFiles(): Promise<string[]>;
  getUpdatedFiles(): Promise<string[]>;
}
