import { CliBuilder } from "commandzen";
import { configCommandFactory } from "./modules/config";
import { HookCommand } from "./modules/hook";
import { wizardCommandFactory } from "./modules/wizard";

function main() {
  const cli = CliBuilder.create({
    name: "commit-craft",
    description: "A CLI tool for generating commit messages",
  })
    .setDefaultCommand(wizardCommandFactory())
    .addCommand(configCommandFactory())
    .addCommand(HookCommand.createDefault().createCommand());

  cli.parse();
}

main();
