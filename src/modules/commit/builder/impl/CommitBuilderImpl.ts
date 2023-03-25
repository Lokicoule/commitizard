import {
  Commit,
  CommitBody,
  CommitBreakingChanges,
  CommitFooter,
  CommitReferences,
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
  private references?: CommitReferences;
  private body?: CommitBody;
  private footer?: CommitFooter;

  public getType(): CommitType {
    return this.type;
  }

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

  public withReferences(references: CommitReferences): CommitBuilder {
    this.references = references;
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
    return {
      type: this.type,
      scope: this.scope,
      subject: this.subject,
      breakingChanges: this.breakingChanges,
      references: this.references,
      body: this.body,
      footer: this.footer,
    };
  }
}
