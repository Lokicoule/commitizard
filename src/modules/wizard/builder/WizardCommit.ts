export interface WizardCommit {
  message: string;
}

export class WizardCommitBuilder {
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
