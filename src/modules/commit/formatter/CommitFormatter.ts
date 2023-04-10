import { Commit, CommitTemplate } from "../builder/types";

const keyMap: Record<string, keyof Commit> = {
  type: "type",
  scope: "scope",
  subject: "subject",
  body: "body",
  footer: "footer",
  breaking: "breakingChanges",
  refs: "references",
};

export class CommitFormatter {
  public static format(
    commit: Commit,
    template: CommitTemplate,
    templateOrder: string[]
  ): string {
    return templateOrder
      .map((templateKey) => {
        const commitKey = keyMap[templateKey];
        const commitValue = commit[commitKey];
        const templateValue = template[templateKey];
        if (
          commitValue &&
          Boolean(commitValue.message) &&
          templateValue !== ""
        ) {
          return templateValue.replace(
            `{{${templateKey}}}`,
            commitValue.message
          );
        }

        return "";
      })
      .join("")
      .replace(/\\n/g, "\n");
  }
}
