import { CommitTemplate, RedGreenOptions } from "../../../core/config/types";
import {
  RedGreenCommit,
  RedGreenCommitSubject,
} from "../builder/impl/RedGreenCommitBuilderImpl";

export class RedGreenCommitFormatter {
  constructor(private readonly options: RedGreenOptions) {}

  public format(commit: RedGreenCommit): string {
    const { type, subject } = commit;

    const template = this.options.commitOptions.template;
    const templateOrder = this.options.commitOptions.templateOrder;

    const formattedCommit = templateOrder
      .map((templateKey) => {
        switch (templateKey) {
          case "type":
            return template.type.replace("{{type}}", type.data);
          case "subject":
            return template.subject.replace(
              "{{subject}}",
              this.formatSubject(subject)
            );
          default:
            return "";
        }
      })
      .join("");

    return formattedCommit.replace(/\\n/g, "\n");
  }

  private formatSubject(subject: RedGreenCommitSubject): string {
    const { pattern, options, feature } = subject;

    const formattedSubject = options
      .map((option) => {
        return pattern.replace(`{{${option.key}}}`, option.value);
      })
      .join("");

    return formattedSubject.replace("{{feature}}", feature.data);
  }
}
