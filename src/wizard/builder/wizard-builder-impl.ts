import { CommitBuilder } from "../../commit/interface/commit-builder";
import { CommitBuilderFactory } from "../../commit/factory/commit-builder-factory";
import { Commit, CommitType } from "../../commit/model/commit";
import { WizardBuilder } from "../interfaces/wizard-builder";

export class WizardBuilderImpl implements WizardBuilder {
  private commitBuilder: CommitBuilder;

  constructor() {
    this.commitBuilder = CommitBuilderFactory.create();
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
