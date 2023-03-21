import { blue } from "picocolors";
import { Type } from "~/core/config/types";
import { CommitBuilder } from "../../../commit/builder/CommitBuilder";
import { CommitSubject } from "../../../commit/types";
import { BaseRedGreenRefactorHandler } from "./BaseRedGreenRefactorHandler";

const DEFAULT_COMMIT_SUBJECT = "No commit subject";

export class RedGreenRefactorSubjectHandler extends BaseRedGreenRefactorHandler {
  protected async processInput(commitBuilder: CommitBuilder): Promise<void> {
    const commitType = commitBuilder.getType().message;
    const type = this.configuration.redGreenRefactor?.cliOptions.types.find(
      (type) => type.value === commitType
    );
    if (!type) {
      throw new Error("No commit type available!");
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

    while (!commitSubject) {
      const selection = await this.promptManager.select<Type[], string>({
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
        placeholderValue = await this.promptManager.select<Type[], string>({
          message: `Select value for placeholder ${blue(placeholder)}:`,
          options,
        });
      } else {
        placeholderValue = await this.promptManager.text({
          message: `Enter value for placeholder ${blue(placeholder)}:`,
        });
      }

      result = result.replace(`{{${placeholder}}}`, placeholderValue);
    }

    return result;
  }

  private async inputCustomCommitSubject(): Promise<string> {
    let commitSubject: string | undefined;

    while (!commitSubject) {
      commitSubject = await this.promptManager.text({
        message: "Enter commit subject:",
        abortMessage: "Commit subject selection aborted!",
      });
    }

    return commitSubject;
  }
}
