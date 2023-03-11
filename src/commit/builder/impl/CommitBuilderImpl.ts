import { CommitBuilder } from "../CommitBuilder";
import { Commit } from "../../model/Commit";

export class CommitBuilderImpl implements CommitBuilder {
  private type: string = "";
  private scope: string = "";
  private message: string = "";
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
    if (!this.type) {
      throw new Error("Commit type is required");
    }

    return new Commit({
      type: this.type,
      scope: this.scope,
      message: this.message,
      body: this.body,
      footer: this.footer,
    });
  }

  public toString(): string {
    return [
      this.type,
      Boolean(this.scope) ? `(${this.scope})` : "",
      Boolean(this.message) ? `: ${this.message}` : "",
      Boolean(this.body) ? `\n\n${this.body}` : "",
      Boolean(this.footer) ? `\n\n${this.footer}` : "",
    ]
      .filter(
        (value) => value !== null && value !== undefined && value.length > 0
      )
      .join("");
  }
}
