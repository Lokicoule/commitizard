export type CommitProperty = "type" | "scope" | "subject" | "body" | "footer";
export type CommitProperties = Record<CommitProperty, string>;

export type CommitType = {
  value: string;
  label: string;
};

export class Commit {
  public readonly type: string;
  public readonly scope: string;
  public readonly subject: string;
  public readonly body: string;
  public readonly footer: string;

  constructor(data: CommitProperties) {
    this.type = data.type;
    this.scope = data.scope;
    this.subject = data.subject;
    this.body = data.body;
    this.footer = data.footer;
  }

  public isEmpty(): boolean {
    return (
      !this.type && !this.scope && !this.subject && !this.body && !this.footer
    );
  }

  public format(pattern: string): string {
    const { type, scope, subject, body, footer } = this;
    const formattedBody = body ? `\n\n${body}` : "";
    const formattedFooter = footer ? `\n\n${footer}` : "";

    return pattern
      .replace("${type}", type)
      .replace("${scope}", scope)
      .replace("${subject}", subject)
      .replace("${body}", formattedBody)
      .replace("${footer}", formattedFooter);
  }
}
