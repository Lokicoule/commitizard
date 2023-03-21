export interface CommitType {
  message: string;
}

export interface CommitScope {
  message: string;
}

export interface CommitSubject {
  message: string;
}

export interface CommitBreakingChanges {
  message: string;
}

export interface CommitReferences {
  message: string;
}

export interface CommitBody {
  message: string;
}

export interface CommitFooter {
  message: string;
}

export interface Commit {
  type: CommitType;
  scope?: CommitScope;
  subject: CommitSubject;
  breakingChanges?: CommitBreakingChanges;
  references?: CommitReferences;
  body?: CommitBody;
  footer?: CommitFooter;
}
