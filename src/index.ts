import { CliBuilder } from "commandzen";
import { ConfigCommand } from "./modules/config";
import { HookCommand } from "./modules/hook";
import { WizardCommand } from "./modules/wizard";

function main() {
  CliBuilder.create({
    name: "commit-craft",
    description: "A CLI tool for generating commit messages",
  })
    .setDefaultCommand(WizardCommand.create())
    .addCommand(ConfigCommand.create())
    .addCommand(HookCommand.createDefault().createCommand())
    .parse();
}

main();
