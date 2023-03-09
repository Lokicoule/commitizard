import { CommitBuilder } from "../commit/commit.builder";
import { Commit, CommitType } from "../commit/commit.model";

export class WizardBuilder {
  private commitBuilder: CommitBuilder;

  constructor() {
    this.commitBuilder = new CommitBuilder();
  }

  withCommitType(commitType: CommitType): WizardBuilder {
    this.commitBuilder.withType(commitType);
    return this;
  }

  withCommitScope(scope: string | null): WizardBuilder {
    this.commitBuilder.withScope(scope);
    return this;
  }

  withCommitMessage(message: string | null): WizardBuilder {
    this.commitBuilder.withMessage(message);
    return this;
  }

  withBreakingChanges(breakingChanges: string[] | null): WizardBuilder {
    if (breakingChanges && breakingChanges.length > 0) {
      const message = `BREAKING CHANGE: \n- ${breakingChanges.join("\n- ")}`;
      this.commitBuilder.withBody(message);
    }
    return this;
  }

  withIssueNumbers(issueNumbers: string[] | null): WizardBuilder {
    if (issueNumbers && issueNumbers.length > 0) {
      const message = `Closes: #${issueNumbers.join(", #")}`;
      this.commitBuilder.withFooter(message);
    }
    return this;
  }

  build(): Commit {
    return this.commitBuilder.build();
  }
}
