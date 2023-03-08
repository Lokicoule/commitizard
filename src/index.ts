import { Command } from "commander";

import { intro, outro, select, text, confirm } from "@clack/prompts";
import { exec } from "child_process";
import { CommitBuilder } from "./commit/commit.builder";
import { CommitType } from "./commit/commit.model";

const program = new Command();

program
  .version("0.0.1")
  .description("A CLI tool for generating commit messages")
  .usage("[command] [options]")
  .helpOption("-h, --help", "Display help for command");

const generateCommand = program.createCommand("generate").action(async () => {
  intro("GitHub Commit Message Generator");

  const commitType = (await select({
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
  })) as CommitType;

  const commitScope = (await text({
    message: "Enter commit scope (optional):",
    placeholder: "e.g., component name",
  })) as string;

  const commitMessage = (await text({
    message: "Enter commit message:",
    placeholder: "Short description of the change",
    validate(value) {
      if (value.length === 0) return "Commit message is required!";
    },
  })) as string;

  const commitBody = (await text({
    message: "Enter commit body (optional):",
    placeholder: "Detailed description of the change",
  })) as string;

  const commitFooter = (await text({
    message: "Enter commit footer (optional):",
    placeholder: "Breaking changes, issue references, etc.",
  })) as string;

  const commit = new CommitBuilder()
    .withBody(commitBody)
    .withFooter(commitFooter)
    .withMessage(commitMessage)
    .withScope(commitScope)
    .withType(commitType)
    .build();

  const confirmCommit = await confirm({
    message: `Commit message:\n\n${commit}\n\nIs this correct?`,
  });

  if (confirmCommit) {
    exec(`git commit -m "${commit}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });
  }

  outro("GitHub commit message generated!");
});

program.addCommand(generateCommand);

program.parse(process.argv);
