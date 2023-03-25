export interface WizardCommit {
  message: string;
  files: string[];
}

export interface WizardCommitBuilder {
  withMessage(message: string): WizardCommitBuilder;
  withFiles(files: string[]): WizardCommitBuilder;
  build(): WizardCommit;
}

export class WizardCommitBuilderImpl implements WizardCommitBuilder {
  private message = "";
  private files: string[] = [];

  public withMessage(message: string): WizardCommitBuilder {
    this.message = message;
    return this;
  }

  public withFiles(files: string[]): WizardCommitBuilder {
    this.files = files;
    return this;
  }

  public build(): WizardCommit {
    return {
      message: this.message,
      files: this.files,
    };
  }
}

export class WizardCommitBuilderFactory {
  public static create(): WizardCommitBuilder {
    return new WizardCommitBuilderImpl();
  }
}
