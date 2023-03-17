import {
  Commit,
  CommitBody,
  CommitBreakingChanges,
  CommitFooter,
  CommitIssueNumbers,
  CommitScope,
  CommitSubject,
  CommitType,
} from "../types";

export interface CommitBuilder {
  withType(type: CommitType): CommitBuilder;
  withScope(scope: CommitScope): CommitBuilder;
  withSubject(subject: CommitSubject): CommitBuilder;
  withBreakingChanges(breakingChanges: CommitBreakingChanges): CommitBuilder;
  withIssueNumbers(issueNumbers: CommitIssueNumbers): CommitBuilder;
  withBody(body: CommitBody): CommitBuilder;
  withFooter(footer: CommitFooter): CommitBuilder;
  build(): Commit;
}
