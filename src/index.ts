import { Command } from "commander";
import { ConfigGeneratorCommandFactory } from "./modules/config-generator/factory/ConfigGeneratorCommandFactory";
import { WizardCommandFactory } from "./modules/wizard/factory/WizardCommandFactory";

const program = new Command();

program
  .version("0.0.1")
  .description("A CLI tool for generating commit messages")
  .usage("[command] [options]")
  .helpOption("-h, --help", "Display help for command");

program.addCommand(WizardCommandFactory.create());
program.addCommand(ConfigGeneratorCommandFactory.create());

program.parse(process.argv);
