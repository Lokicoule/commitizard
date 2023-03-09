import { Commit, CommitType } from "./commit.model";

export class CommitBuilder {
  private type: CommitType = "feat";
  private scope: string = "";
  private message: string = "";
  private body: string = "";
  private footer: string = "";

  public withType(type: CommitType): CommitBuilder {
    this.type = type;
    return this;
  }

  public withScope(scope: string | null): CommitBuilder {
    if (scope) {
      this.scope = scope;
    }
    return this;
  }

  public withMessage(message: string | null): CommitBuilder {
    if (message) {
      this.message = message;
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
    return new Commit({
      type: this.type,
      scope: this.scope,
      message: this.message,
      body: this.body,
      footer: this.footer,
    });
  }
}
