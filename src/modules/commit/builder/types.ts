export type CommitType = {
  message: string;
};

export type CommitScope = {
  message: string;
};

export type CommitSubject = {
  message: string;
};

export type CommitBreakingChanges = {
  message: string;
};

export type CommitReferences = {
  message: string;
};

export type CommitBody = {
  message: string;
};

export type CommitFooter = {
  message: string;
};

export type Commit = {
  type: CommitType;
  scope?: CommitScope;
  subject: CommitSubject;
  breakingChanges?: CommitBreakingChanges;
  references?: CommitReferences;
  body?: CommitBody;
  footer?: CommitFooter;
};

export type CommitTemplate = {
  [key: string]: string;
};
