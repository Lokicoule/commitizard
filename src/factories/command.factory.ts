/* import { Command } from "commander";
import { ConfigureCommand } from "../commands/configure.command";
import { GenerateCommand } from "../commands/generate.command";

export class CommandFactory {
  static createCommand(commandName: string): Command {
    switch (commandName) {
      case "generate":
        return new GenerateCommand("generate");
      case "configure":
        return new ConfigureCommand("configure");
      default:
        throw new Error(`Unknown command: ${commandName}`);
    }
  }
}
 */
