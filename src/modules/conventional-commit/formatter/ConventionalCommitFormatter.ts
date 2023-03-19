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
            return template.type.replace("{{type}}", type.data);
          case "scope":
            return scope?.data
              ? template.scope?.replace("{{scope}}", scope.data)
              : "";
          case "subject":
            return template.subject.replace("{{subject}}", subject.data);
          case "body":
            return body?.data
              ? template.body?.replace("{{body}}", body.data)
              : "";
          case "footer":
            return footer
              ? template.footer?.replace("{{footer}}", footer.data)
              : "";
          case "breaking":
            return breakingChanges?.data
              ? template.breaking?.replace("{{breaking}}", breakingChanges.data)
              : "";
          case "refs":
            return references?.data
              ? template.refs?.replace("{{refs}}", references.data)
              : "";
          default:
            return "";
        }
      })
      .join("");

    return formattedCommit.replace(/\\n/g, "\n");
  }
}
