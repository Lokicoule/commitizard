import { Command } from "commander";

export interface WizardCommand extends Command {
  run(): Promise<void>;
}
