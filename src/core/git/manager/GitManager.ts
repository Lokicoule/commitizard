/**
 * @interface GitManager
 * @description
 * This interface defines the contract for the GitManager.
 * The GitManager is responsible for managing the git repository.
 *
 * @method commit - Commits the staged files.
 * @method getCreatedFiles - Gets the created files.
 * @method getStagedFiles - Gets the staged files.
 * @method getUpdatedFiles - Gets the updated files.
 * @method hasStagedFiles - Checks if there are staged files.
 * @method isGitRepository - Checks if the current directory is a git repository.
 * @method runGitCommand - Runs a git command.
 * @method stageFiles - Stages the given files.
 * @method getDeletedFiles - Gets the deleted files.
 */
export interface GitManager {
  isGitRepository(): Promise<boolean>;
  getStagedFiles(): Promise<string[]>;
  stageFiles(files: string[]): Promise<void>;
  commit(message: string): Promise<void>;
  hasStagedFiles(): Promise<boolean>;
  getCreatedFiles(): Promise<string[]>;
  getUpdatedFiles(): Promise<string[]>;
  runGitCommand(command: string[]): Promise<string>;
  getDeletedFiles(): Promise<string[]>;
}
