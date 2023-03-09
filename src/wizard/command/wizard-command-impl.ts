import {
  cancel,
  confirm,
  intro,
  isCancel,
  outro,
  select,
  text,
} from "@clack/prompts";
import { exec } from "child_process";
import { Command } from "commander";
import pc from "picocolors";
import { Commit, CommitType } from "../../commit/model/commit";
import { WizardBuilderFactory } from "../factories/wizard-builder-factory";
import { WizardCommand } from "../interfaces/wizard-command";

export class WizardCommandImpl extends Command implements WizardCommand {
  constructor() {
    super();
  }

  async run() {
    intro("GitHub Commit Message Wizard");

    const builder = WizardBuilderFactory.create();

    const commitType = await this.handleSelectCommitType();
    builder.withCommitType(commitType);

    const scope = await this.handleCommitScope();
    builder.withCommitScope(scope);

    const message = await this.handleCommitMessage();
    builder.withCommitMessage(message);

    const breakingChanges = await this.handleBreakingChanges();
    builder.withBreakingChanges(breakingChanges);

    const issueNumbers = await this.handleIssueNumbers();
    builder.withIssueNumbers(issueNumbers);

    const commitMessage = builder.build();

    const confirmCommit = await this.handleConfirmCommit(commitMessage);

    if (confirmCommit) {
      exec(`git commit -m "${commitMessage}"`, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
      });

      outro(pc.green("✔") + " Commit created successfully!");
    } else {
      outro(pc.red("✖") + " Commit creation aborted!");
    }
  }

  async handleSelectCommitType(): Promise<CommitType> {
    const commitType = await select({
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
    });

    if (isCancel(commitType)) {
      cancel("Commit creation aborted!");
      process.exit(0);
    }

    return (commitType as CommitType) ?? null;
  }

  async handleCommitScope() {
    const scope = (await text({
      message: "Enter commit scope (optional):",
      placeholder: "e.g., component name",
    })) as string;

    if (isCancel(scope)) {
      cancel("Commit creation aborted!");
      process.exit(0);
    }

    return scope ?? null;
  }

  async handleCommitMessage() {
    const message = (await text({
      message: "Please enter a commit message (optional):",
    })) as string;

    if (isCancel(message)) {
      cancel("Commit creation aborted!");
      process.exit(0);
    }

    return message ?? null;
  }

  async handleBreakingChanges() {
    let breakingChanges: string[] = [];
    let isBreakingChange = (await confirm({
      initialValue: false,
      message: "Is this a breaking change?",
    })) as boolean;

    while (isBreakingChange) {
      breakingChanges.push(
        (await text({
          message: "Please enter a description for the breaking change:",
        })) as string
      );

      isBreakingChange = (await confirm({
        initialValue: false,
        message: "Is this an other breaking change?",
      })) as boolean;
    }

    return breakingChanges?.length > 0 ? breakingChanges : null;
  }

  async handleIssueNumbers() {
    let issueNumbers: string[] = [];
    let isIssueAffected = (await confirm({
      initialValue: false,
      message: "Does this commit affect any open issues?",
    })) as boolean;

    while (isIssueAffected) {
      issueNumbers.push(
        (await text({
          message: "Please enter the issue number:",
        })) as string
      );

      isIssueAffected = (await confirm({
        initialValue: false,
        message: "Does this commit affect any other open issues?",
      })) as boolean;
    }

    return issueNumbers?.length > 0 ? issueNumbers : null;
  }

  async handleConfirmCommit(commitMessage: Commit) {
    return (
      ((await confirm({
        initialValue: false,
        message: `Commit message:\n\n${commitMessage}\n\nDo you want to commit with this message?`,
      })) as boolean) ?? null
    );
  }
}
