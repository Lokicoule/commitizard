export type CommitType =
  | "feat"
  | "fix"
  | "docs"
  | "style"
  | "refactor"
  | "perf"
  | "test"
  | "chore";
export type CommitProperty = "type" | "scope" | "message" | "body" | "footer";
export type CommitProperties = Record<CommitProperty, string>;

export class Commit {
  public readonly type: CommitType;
  public readonly scope: string;
  public readonly message: string;
  public readonly body: string;
  public readonly footer: string;

  constructor(data: CommitProperties) {
    this.type = data.type as CommitType;
    this.scope = data.scope;
    this.message = data.message;
    this.body = data.body;
    this.footer = data.footer;
  }

  public toString(): string {
    return [
      this.type,
      this.scope ? `(${this.scope})` : "",
      this.message ? `: ${this.message}` : "",
      this.body ? `\n\n${this.body}` : "",
      this.footer ? `\n\n${this.footer}` : "",
    ]
      .filter(
        (value) => value !== null && value !== undefined && value.length > 0
      )
      .join("");
  }
}
