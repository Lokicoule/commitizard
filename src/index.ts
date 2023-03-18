import { log } from "@clack/prompts";
import { Command } from "commander";
import { ConfigCommandFactory } from "./modules/config/factory/ConfigCommandFactory";
import { getStagedDiff, getStagedFiles, isInsideGitRepo } from "./libs/git";
import { promptConfirm, promptSelect, promptText } from "./libs/prompt";
/* import { SmartCommitCommandFactory } from "./modules/smart-commit";
 */ import { WizardCommandFactory } from "./modules/wizard/factory/WizardCommandFactory";

import "reflect-metadata";

const program = new Command();

program
  .version("0.0.1")
  .description("A CLI tool for generating commit messages")
  .usage("[command] [options]")
  .helpOption("-h, --help", "Display help for command");

program.addCommand(WizardCommandFactory.create());
program.addCommand(ConfigCommandFactory.create());

program.parse(process.argv);
