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

export interface CliOptions {
  scopes?: Scope[];
  types: Type[];
}

export type ConventionOptions = {
  commitOptions: CommitOptions;
  cliOptions: CliOptions;
};

export type Config = {
  conventional: ConventionOptions;
  "red-green-refactor": ConventionOptions;
};
