import {
  Commit,
  CommitBody,
  CommitBreakingChanges,
  CommitFooter,
  CommitIssueNumbers,
  CommitScope,
  CommitSubject,
  CommitType,
} from "../../types";
import { CommitBuilder } from "../CommitBuilder";

export class CommitBuilderImpl implements CommitBuilder {
  private type!: CommitType;
  private scope?: CommitScope;
  private subject!: CommitSubject;
  private breakingChanges?: CommitBreakingChanges;
  private issueNumbers?: CommitIssueNumbers;
  private body?: CommitBody;
  private footer?: CommitFooter;

  public withType(type: CommitType): CommitBuilder {
    this.type = type;
    return this;
  }

  public withScope(scope: CommitScope): CommitBuilder {
    this.scope = scope;
    return this;
  }

  public withSubject(subject: CommitSubject): CommitBuilder {
    this.subject = subject;
    return this;
  }

  public withBreakingChanges(
    breakingChanges: CommitBreakingChanges
  ): CommitBuilder {
    this.breakingChanges = breakingChanges;
    return this;
  }

  public withIssueNumbers(issueNumbers: CommitIssueNumbers): CommitBuilder {
    this.issueNumbers = issueNumbers;
    return this;
  }

  public withBody(body: CommitBody): CommitBuilder {
    this.body = body;
    return this;
  }

  public withFooter(footer: CommitFooter): CommitBuilder {
    this.footer = footer;
    return this;
  }

  public build(): Commit {
    this.validate();

    return {
      type: this.type,
      scope: this.scope,
      subject: this.subject,
      breakingChanges: this.breakingChanges,
      issueNumbers: this.issueNumbers,
      body: this.body,
      footer: this.footer,
    };
  }

  private validate(): void {
    if (!this.type) {
      throw new Error("Commit type must be set!");
    }

    if (!this.subject) {
      throw new Error("Commit subject must be set!");
    }
  }
}
