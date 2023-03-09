import { Command } from "commander";

import { WizardCommand } from "./wizard";

const program = new Command();

program
  .version("0.0.1")
  .description("A CLI tool for generating commit messages")
  .usage("[command] [options]")
  .helpOption("-h, --help", "Display help for command");

program.addCommand(new WizardCommand());

program.parse(process.argv);
