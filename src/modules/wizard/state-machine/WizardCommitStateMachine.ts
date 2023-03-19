export enum WizardCommitState {
  AddFilesToCommit,
  SelectConvention,
  UseConventionalCommit,
  UseRedGreenCommit,
  ReviewCommit,
  CommitComplete,
}

export interface WizardCommitStateMachine {
  getState(): WizardCommitState;
  handleCommit(): void;
  setMessage(message: string): void;
  getMessage(): string;
}
