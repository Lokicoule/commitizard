import { Command } from "commander";
import { Configuration } from "../../../../core/config/Configuration";
import { PromptManagerImpl } from "../../../../libs/prompt/impl/PromptManagerImpl";
import { WizardCommitStateMachineFactory } from "../../factory/WizardCommitStateMachineFactory";
import { WizardCommand } from "../WizardCommand";

export class WizardCommandImpl extends Command implements WizardCommand {
  constructor() {
    super();
  }

  async run(configPath?: string): Promise<void> {
    const promptManager = new PromptManagerImpl();

    promptManager.intro({
      message: "Welcome to the commit wizard!",
    });

    const config = Configuration.initialize(configPath);

    const stateMachine = WizardCommitStateMachineFactory.create(
      config,
      promptManager
    );
    stateMachine.handleCommit();
  }
}
