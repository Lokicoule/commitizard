export interface CommitTemplate {
  type: string;
  scope?: string;
  subject: string;
  body?: string;
  footer?: string;
  breaking?: string;
  refs?: string;
}

export interface CommitOptions {
  template: CommitTemplate;
  templateOrder: string[];
}

export interface Scope {
  value: string;
  label: string;
}

export interface Type {
  value: string;
  label: string;
}

export interface ConventionalCliOptions {
  scopes?: Scope[];
  types: Type[];
}

export type RedGreenRefactorOptions = {
  value: string;
  options: Type[];
};

export type RedGreenCliOptions = {
  types: Type[];
  redPatterns: string[];
  greenPatterns: string[];
  refactorPatterns: string[];
  refactorOptions: RedGreenRefactorOptions[];
};

export type ConventionalOptions = {
  commitOptions: CommitOptions;
  cliOptions: ConventionalCliOptions;
};

export type RedGreenOptions = {
  commitOptions: CommitOptions;
  cliOptions: RedGreenCliOptions;
};

export type Config = {
  conventional: ConventionalOptions;
  "red-green-refactor": RedGreenOptions;
};
