import { Command } from "commander";
import { Configuration } from "../../../../core/config/Configuration";
import {
  WizardCommitStateMachine,
  WizardCommitState,
} from "../../state-machine/WizardCommitStateMachine";
import { WizardCommitStateMachineImpl } from "../../state-machine/impl/WizardCommitStateMachineImpl";
import { WizardCommand } from "../WizardCommand";
import { promptIntro } from "../../../../libs/prompt";
import { WizardCommitStateMachineFactory } from "../../factory/WizardCommitStateMachineFactory";
import { WizardCommitStateMachineFactoryImpl } from "../../factory/impl/WizardCommitStateMachineFactoryImpl";

export class WizardCommandImpl extends Command implements WizardCommand {
  private stateMachineFactory: WizardCommitStateMachineFactory;
  constructor() {
    super();
    this.stateMachineFactory = new WizardCommitStateMachineFactoryImpl();
  }

  async run(configPath?: string): Promise<void> {
    promptIntro("GitHub Commit Message Wizard");

    Configuration.initialize(configPath);

    const stateMachine = this.stateMachineFactory.create();
    stateMachine.handleCommit();
  }
}
