import { ConfigurationManager } from "~/core/configuration";
import { AbstractHandler } from "../../../../core/handler/impl/AbstractHandler";
import { PromptManager } from "../../../../libs/prompt";
import { CommitBuilder } from "../../../commit/builder/CommitBuilder";
import { RedGreenRefactorHandler } from "../RedGreenRefactorHandler";

export abstract class BaseRedGreenRefactorHandler
  extends AbstractHandler<CommitBuilder>
  implements RedGreenRefactorHandler
{
  protected readonly promptManager: PromptManager;
  protected readonly configurationManager: ConfigurationManager;

  constructor(
    promptManager: PromptManager,
    configurationManager: ConfigurationManager
  ) {
    super();
    this.promptManager = promptManager;
    this.configurationManager = configurationManager;
  }

  protected abstract processInput(commitBuilder: CommitBuilder): Promise<void>;
}
