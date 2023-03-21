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

export interface RedGreenType extends Type {
  patterns: string[];
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
  types: RedGreenType[];
};

export type ConventionalOptions = {
  commitOptions: CommitOptions;
  cliOptions: ConventionalCliOptions;
};

export type RedGreenOptions = {
  commitOptions: CommitOptions;
  cliOptions: RedGreenCliOptions;
};

export type WizardOptions = {
  maxViewFilesToShow: number;
};

export type Config = {
  version: string;
  wizard: WizardOptions;
  conventional: ConventionalOptions;
  redGreenRefactor: RedGreenOptions;
};
