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

  public withScope(scope: string): CommitBuilder {
    this.scope = scope;
    return this;
  }

  public withMessage(message: string): CommitBuilder {
    this.message = message;
    return this;
  }

  public withBody(body: string): CommitBuilder {
    this.body = body;
    return this;
  }

  public withFooter(footer: string): CommitBuilder {
    this.footer = footer;
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
