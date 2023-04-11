import { blue } from "picocolors";
import { CliOptions } from "~/core/configuration/types";
import { CommitBuilder } from "~/modules/commit/builder/CommitBuilder";
import { CommitSubject } from "~/modules/commit/builder/types";
import { BaseRedGreenRefactorHandler } from "../BaseRedGreenRefactorHandler";

const DEFAULT_COMMIT_SUBJECT = "No commit subject";

export class RedGreenRefactorSubjectHandler extends BaseRedGreenRefactorHandler {
  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    const commitType = commitBuilder.getType();

    const type =
      this.configurationManager.selectorRedGreenRefactorCliOptionsTypes(
        commitType?.message
      );
    if (!type) {
      throw new Error(
        "No commit type configuration found for " + blue(commitType?.message)
      );
    }

    const commitSubject = await this.selectCommitSubject(type.patterns);

    commitBuilder.withSubject(commitSubject);
  }

  private async selectCommitSubject(
    patterns: string[]
  ): Promise<CommitSubject> {
    const options = patterns.map((pattern) => ({
      value: pattern,
      label: pattern,
    }));

    options.unshift({
      value: DEFAULT_COMMIT_SUBJECT,
      label: "Use custom commit subject",
    });

    let commitSubject: string | undefined;

    while (commitSubject === null || commitSubject === undefined) {
      const selection = await this.promptManager.select<CliOptions[], string>({
        message: "Select commit subject:",
        options,
      });

      if (selection === DEFAULT_COMMIT_SUBJECT) {
        commitSubject = await this.inputCustomCommitSubject();
      } else {
        commitSubject = await this.selectPlaceholders(selection);
      }
    }

    return {
      message: commitSubject,
    };
  }

  private async selectPlaceholders(subject: string): Promise<string> {
    const placeholders = subject.match(/(?<=\{{)[^{}]+(?=\}})/g);

    if (!placeholders) {
      return subject;
    }

    let result = subject;

    for (const placeholder of placeholders) {
      let placeholderValue: string;

      if (placeholder.includes("/")) {
        const options = placeholder.split("/").map((option) => ({
          value: option,
          label: option,
        }));
        placeholderValue = await this.promptManager.select<
          CliOptions[],
          string
        >({
          message: `Select value for placeholder ${blue(placeholder)}:`,
          options,
        });
      } else {
        placeholderValue = await this.promptManager.text({
          message: `Enter value for placeholder ${blue(placeholder)}:`,
          validate: (value) =>
            value.length === 0
              ? `${blue(placeholder)} is required!`
              : undefined,
        });
      }

      result = result.replace(`{{${placeholder}}}`, placeholderValue);
    }

    return result;
  }

  private async inputCustomCommitSubject(): Promise<string> {
    const commitSubject = await this.promptManager.text({
      message: "Enter custom commit subject:",
      abortMessage: "Commit subject selection aborted!",
      validate: (value) =>
        value.length === 0 ? `Subject is required!` : undefined,
    });

    return commitSubject;
  }
}
