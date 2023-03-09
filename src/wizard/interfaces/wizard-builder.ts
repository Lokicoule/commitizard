import { Commit, CommitType } from "../../commit/model/commit";

export interface WizardBuilder {
  withCommitType(commitType: CommitType): WizardBuilder;
  withCommitScope(scope: string | null): WizardBuilder;
  withCommitMessage(message: string | null): WizardBuilder;
  withBreakingChanges(breakingChanges: string[] | null): WizardBuilder;
  withIssueNumbers(issueNumbers: string[] | null): WizardBuilder;
  build(): Commit;
}
