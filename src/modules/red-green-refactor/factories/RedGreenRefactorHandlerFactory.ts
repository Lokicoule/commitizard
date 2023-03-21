import { Config } from "../../../core/config";
import { PromptManager } from "../../../libs/prompt";
import { RedGreenRefactorHandler } from "../handlers/RedGreenRefactorHandler";
import { RedGreenRefactorBodyHandler } from "../handlers/impl/RedGreenRefactorBodyHandler";
import { RedGreenRefactorSubjectHandler } from "../handlers/impl/RedGreenRefactorSubjectHandler";
import { RedGreenRefactorTypeHandler } from "../handlers/impl/RedGreenRefactorTypeHandler";

export class RedGreenRefactorHandlerFactory {
  private configuration: Config;
  private promptManager: PromptManager;

  constructor(promptManager: PromptManager, configuration: Config) {
    this.configuration = configuration;
    this.promptManager = promptManager;
  }

  public createTypeHandler(): RedGreenRefactorHandler {
    return new RedGreenRefactorTypeHandler(
      this.promptManager,
      this.configuration
    );
  }

  public createSubjectHandler(): RedGreenRefactorHandler {
    return new RedGreenRefactorSubjectHandler(
      this.promptManager,
      this.configuration
    );
  }

  public createBodyHandler(): RedGreenRefactorHandler {
    return new RedGreenRefactorBodyHandler(
      this.promptManager,
      this.configuration
    );
  }
}
