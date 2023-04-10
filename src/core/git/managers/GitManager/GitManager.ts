/**
 * @category Core
 * @subcategory Git
 * @interface GitManager
 * @description
 * This interface defines the contract for the GitManager.
 * The GitManager is responsible for managing the git repository.
 */
export interface GitManager {
  getStagedFiles(): Promise<string[]>;
  getCreatedFiles(): Promise<string[]>;
  getUpdatedFiles(): Promise<string[]>;
  getDeletedFiles(): Promise<string[]>;
  isGitRepository(): Promise<boolean>;
  hasStagedFiles(): Promise<boolean>;
  stageFiles(files: string[]): Promise<void>;
  commit(message: string): Promise<void>;
}
