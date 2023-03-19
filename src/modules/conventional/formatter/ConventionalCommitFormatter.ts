import { Configuration } from "../../../core/config/Configuration";
import { Commit } from "../types";

export class ConventionalCommitFormatter {
  public static format(commit: Commit): string {
    const { type, scope, subject, body, footer, breakingChanges, references } =
      commit;

    const template =
      Configuration.getConfig().conventional.commitOptions.template;
    const templateOrder =
      Configuration.getConfig().conventional.commitOptions.templateOrder;

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
