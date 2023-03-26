import { ConfigurationManager } from "~/core/configuration";
import { GitManager } from "~/core/git";
import { BaseChainHandler } from "~/core/handler/impl/BaseChainHandler";
import { PromptManager } from "~/core/prompt";
import { WizardCommitBuilder } from "../builder/WizardCommitBuilder";
import { WizardCommitHandler } from "./WizardCommitHandler";

export abstract class BaseWizardCommitHandler
  extends BaseChainHandler<WizardCommitBuilder>
  implements WizardCommitHandler
{
  protected readonly promptManager: PromptManager;
  protected readonly configurationManager: ConfigurationManager;
  protected readonly gitManager: GitManager;

  constructor(
    promptManager: PromptManager,
    configurationManager: ConfigurationManager,
    gitManager: GitManager
  ) {
    super();
    this.promptManager = promptManager;
    this.configurationManager = configurationManager;
    this.gitManager = gitManager;
  }
}
