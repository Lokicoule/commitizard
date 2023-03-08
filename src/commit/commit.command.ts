import { Command } from "../interfaces/command";
import { PromptBuilder } from "../prompt/prompt.builder";
import { CommitBuilder } from "./commit.builder";
import { ClackPromptAdapter } from "../adapters/clack-prompt.adapter";

export class CommitCommand implements Command {
  private readonly commitBuilder: CommitBuilder;
  private readonly promptBuilder: PromptBuilder;

  constructor() {
    this.commitBuilder = new CommitBuilder();
    this.promptBuilder = new PromptBuilder(new ClackPromptAdapter());
  }

  public async run(): Promise<void> {
    const commit = await this.promptBuilder
      .addSelect({
        message: "Select commit type:",
        options: [
          { value: "feat", label: "feat: A new feature" },
          { value: "fix", label: "fix: A bug fix" },
          { value: "docs", label: "docs: Documentation only changes" },
          {
            value: "style",
            label: "style: Changes that do not affect the meaning of the code",
          },
          {
            value: "refactor",
            label:
              "refactor: A code change that neither fixes a bug nor adds a feature",
          },
          {
            value: "perf",
            label: "perf: A code change that improves performance",
          },
          {
            value: "test",
            label: "test: Adding missing tests or correcting existing tests",
          },
          {
            value: "chore",
            label:
              "chore: Changes to the build process or auxiliary tools and libraries",
          },
        ],
      })
      .addText({
        message: "Enter commit scope (optional):",
        placeholder: "e.g., component name",
      })
      .addText({
        message: "Enter commit message:",
        placeholder: "Short description of the change",
        validate(value) {
          if (value.length === 0) return "Commit message is required!";
        },
      })
      .addText({
        message: "Enter commit body (optional):",
        placeholder: "Detailed description of the change",
      })
      .addText({
        message: "Enter commit footer (optional):",
        placeholder: "Breaking changes, issue references, etc.",
      })
      .run("GitHub Commit Message Generator");

    //console.log(this.commitBuilder.build(commit));
  }
}
