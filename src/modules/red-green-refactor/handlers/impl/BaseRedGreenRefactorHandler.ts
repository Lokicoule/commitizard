import { Config } from "../../../../core/config";
import { AbstractHandler } from "../../../../core/handler/impl/AbstractHandler";
import { PromptManager } from "../../../../libs/prompt";
import { CommitBuilder } from "../../../commit/builder/CommitBuilder";
import { RedGreenRefactorHandler } from "../RedGreenRefactorHandler";

export abstract class BaseRedGreenRefactorHandler
  extends AbstractHandler<CommitBuilder>
  implements RedGreenRefactorHandler
{
  protected promptManager: PromptManager;
  protected configuration: Config;

  constructor(promptManager: PromptManager, configuration: Config) {
    super();
    this.promptManager = promptManager;
    this.configuration = configuration;
  }

  protected abstract processInput(commitBuilder: CommitBuilder): Promise<void>;
}
