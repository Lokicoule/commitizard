export type CliOptions = {
  value: string;
  label: string;
};

export type ConventionalCommitTemplate = {
  type: string;
  scope: string;
  subject: string;
  body: string;
  footer: string;
  breaking: string;
  refs: string;
};

export type RedGreenRefactorCommitTemplate = {
  type: string;
  subject: string;
  body: string;
};

export type RedGreenRefactorCliOptionsType = CliOptions & {
  patterns: string[];
};

export type Configuration = {
  version: string;
  settings: {
    maxViewFilesToShow: number;
  };
  conventional: {
    commitOptions: {
      template: ConventionalCommitTemplate;
      templateOrder: string[];
    };
    cliOptions: {
      types: CliOptions[];
      scopes?: CliOptions[];
    };
  };
  redGreenRefactor: {
    commitOptions: {
      template: RedGreenRefactorCommitTemplate;
      templateOrder: string[];
    };
    cliOptions: {
      types: RedGreenRefactorCliOptionsType[];
    };
  };
};
