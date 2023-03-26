import { Command } from "commander";
import { ConfigCommandFactory } from "./modules/config/factory/ConfigCommandFactory";
import { WizardCommandFactory } from "./modules/wizard/command/WizardCommandFactory";

const program = new Command();

program
  .version("0.0.1")
  .description("A CLI tool for generating commit messages")
  .usage("[command] [options]")
  .helpOption("-h, --help", "Display help for command")
  .enablePositionalOptions()
  .addCommand(WizardCommandFactory.create())
  .addCommand(ConfigCommandFactory.create())
  .parse(process.argv);
