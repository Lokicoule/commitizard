export enum WizardCommitState {
  ADD_FILES_TO_COMMIT = "add_files_to_commit",
  SELECT_COMMIT_CONVENTION = "select_commit_convention",
  USE_CONVENTIONAL_COMMIT_CONVENTION = "use_conventional_commit_convention",
  USE_RED_GREEN_REFACTOR_COMMIT_CONVENTION = "use_red_green_refactor_commit_convention",
  REVIEW_COMMIT_MESSAGE = "review_commit_message",
  RUN_GIT_COMMIT_PROCESS = "run_git_commit_process",
}

export interface WizardCommitStateMachine {
  handleCommit(): void;
  setMessage(message: string): void;
  getMessage(): string;
}
