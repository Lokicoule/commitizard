import { ConfigurationManager } from "~/core/configuration";
import { PromptManager } from "~/libs/prompt";
import {
  WizardCommitState,
  WizardCommitStateMachine,
} from "../../state-machine/WizardCommitStateMachine";
import { WizardCommitHandler } from "../WizardCommitHandler";

export abstract class BaseWizardCommitHandler implements WizardCommitHandler {
  private nextHandler: WizardCommitHandler | null = null;
  protected readonly promptManager: PromptManager;
  protected readonly configurationManager: ConfigurationManager;

  constructor(
    promptManager: PromptManager,
    configurationManager: ConfigurationManager
  ) {
    this.promptManager = promptManager;
    this.configurationManager = configurationManager;
  }

  public setNext(handler: WizardCommitHandler): WizardCommitHandler {
    this.nextHandler = handler;
    return handler;
  }

  public async handle(
    wizard: WizardCommitStateMachine
  ): Promise<WizardCommitState | null> {
    if (this.nextHandler) {
      return await this.nextHandler.handle(wizard);
    }
    return null;
  }
}
