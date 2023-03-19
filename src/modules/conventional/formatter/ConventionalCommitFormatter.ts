import { ConventionalOptions } from "../../../core/config/types";
import { Commit } from "../types";

export class ConventionalCommitFormatter {
  public static format(commit: Commit, options: ConventionalOptions): string {
    const { type, scope, subject, body, footer, breakingChanges, references } =
      commit;

    const template = options.commitOptions.template;
    const templateOrder = options.commitOptions.templateOrder;

    const formattedCommit = templateOrder
      .map((templateKey) => {
        switch (templateKey) {
          case "type":
            return template.type.replace("{{type}}", type.message);
          case "scope":
            return scope?.message
              ? template.scope?.replace("{{scope}}", scope.message)
              : "";
          case "subject":
            return template.subject.replace("{{subject}}", subject.message);
          case "body":
            return body?.message
              ? template.body?.replace("{{body}}", body.message)
              : "";
          case "footer":
            return footer
              ? template.footer?.replace("{{footer}}", footer.message)
              : "";
          case "breaking":
            return breakingChanges?.message
              ? template.breaking?.replace(
                  "{{breaking}}",
                  breakingChanges.message
                )
              : "";
          case "refs":
            return references?.message
              ? template.refs?.replace("{{refs}}", references.message)
              : "";
          default:
            return "";
        }
      })
      .join("");

    return formattedCommit.replace(/\\n/g, "\n");
  }
}
