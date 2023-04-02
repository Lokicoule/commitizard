import { CLI } from "commandzen";
import { ConfigCommandFactory } from "./modules/config/command/ConfigCommandFactory";
import { WizardCommandFactory } from "./modules/wizard/command/WizardCommandFactory";

function main() {
  const cli = new CLI();

  cli.registerDefaultCommand(WizardCommandFactory.create());
  cli.registerCommand(ConfigCommandFactory.create());

  cli.parse(process.argv.slice(2));
}

main();
