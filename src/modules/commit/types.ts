export type CommitTypeOption = {
  value: string;
  label: string;
};

export interface CommitScopeOption {
  value: string;
  label: string;
}

export interface CommitType {
  data: string;
  emoji?: string;
}

export interface CommitScope {
  data: string;
}

export interface CommitSubject {
  data: string;
}

export interface CommitBreakingChanges {
  title: string;
  data: string;
}

export interface CommitIssueNumbers {
  title: string;
  data: string;
}

export interface CommitBody {
  data: string;
}

export interface CommitFooter {
  data: string;
}

export interface Commit {
  type: CommitType;
  scope?: CommitScope;
  subject: CommitSubject;
  breakingChanges?: CommitBreakingChanges;
  issueNumbers?: CommitIssueNumbers;
  body?: CommitBody;
  footer?: CommitFooter;
}
