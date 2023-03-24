export interface WizardCommit {
  message: string;
}

export interface WizardCommitBuilder {
  withMessage(message: string): WizardCommitBuilder;
  build(): WizardCommit;
}

export class WizardCommitBuilderImpl implements WizardCommitBuilder {
  private message: string = "";

  public withMessage(message: string): WizardCommitBuilder {
    this.message = message;
    return this;
  }

  public build(): WizardCommit {
    return {
      message: this.message,
    };
  }
}

export class WizardCommitBuilderFactory {
  public static create(): WizardCommitBuilder {
    return new WizardCommitBuilderImpl();
  }
}
