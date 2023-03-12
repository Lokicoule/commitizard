import { CommitBuilder } from "../CommitBuilder";
import { Commit } from "../../model/Commit";

export class CommitBuilderImpl implements CommitBuilder {
  private type: string = "";
  private scope: string = "";
  private subject: string = "";
  private body: string = "";
  private footer: string = "";

  public withType(type: string): CommitBuilder {
    this.type = type;
    return this;
  }

  public withScope(scope: string | null): CommitBuilder {
    if (scope) {
      this.scope = scope;
    }
    return this;
  }

  public withSubject(subject: string | null): CommitBuilder {
    if (subject) {
      this.subject = subject;
    }

    return this;
  }

  public withBody(body: string | null): CommitBuilder {
    if (body) {
      this.body = body;
    }

    return this;
  }

  public withFooter(footer: string | null): CommitBuilder {
    if (footer) {
      this.footer = footer;
    }

    return this;
  }

  public build(): Commit {
    if (!this.type) {
      throw new Error("Commit type is required");
    }

    return new Commit({
      type: this.type,
      scope: this.scope,
      subject: this.subject,
      body: this.body,
      footer: this.footer,
    });
  }
}
