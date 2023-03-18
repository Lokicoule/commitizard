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
  data: string;
}

export interface CommitReferences {
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
  references?: CommitReferences;
  body?: CommitBody;
  footer?: CommitFooter;
}
