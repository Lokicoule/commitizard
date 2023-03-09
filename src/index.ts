import { log } from "@clack/prompts";
import { Command } from "commander";
import {
  getStagedDiff,
  getStagedFiles,
  isInsideGitRepo,
} from "./git/helper/git-helper";
import { WizardCommandFactory } from "./wizard/factories/wizard-command-factory";

const program = new Command();

program
  .version("0.0.1")
  .description("A CLI tool for generating commit messages")
  .usage("[command] [options]")
  .helpOption("-h, --help", "Display help for command");

program.addCommand(
  program.createCommand("git").action(async () => {
    if (!(await isInsideGitRepo())) {
      log.error("You are not inside a git repository");
      log.info("Please run this command inside a git repository");
      return;
    }
    log.info("Getting staged files...");
    const stagedFiles = await getStagedFiles();
    if (!stagedFiles) {
      log.info("No staged files found");
      return;
    }
    log.success(stagedFiles.join("\n"));
    log.info("Generating diff...");
    for (const file of stagedFiles) {
      log.info(`Generating diff for ${file}...`);
      const diff = await getStagedDiff(file);
      if (!diff) {
        log.info("No diff found");
        return;
      }
      log.success(diff);
    }
  })
);
program.addCommand(WizardCommandFactory.create());

program.parse(process.argv);
