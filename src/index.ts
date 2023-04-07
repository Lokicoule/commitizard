import { CliBuilder } from "commandzen";
import { configCommandFactory } from "./modules/config";
import { hookCommandFactory } from "./modules/hook/command/HookCommand";
import { wizardCommandFactory } from "./modules/wizard/command/wizardCommandFactory";

function main() {
  const cli = CliBuilder.create({
    name: "commit-craft",
    description: "A CLI tool for generating commit messages",
  })
    .setDefaultCommand(wizardCommandFactory())
    .addCommand(configCommandFactory())
    .addCommand(hookCommandFactory());

  cli.parse();
}

main();
