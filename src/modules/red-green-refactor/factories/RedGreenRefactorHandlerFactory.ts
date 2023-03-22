import { ConfigurationManager } from "~/core/configuration";
import { PromptManager } from "~/libs/prompt";
import { RedGreenRefactorBodyHandler } from "../handlers/impl/RedGreenRefactorBodyHandler";
import { RedGreenRefactorSubjectHandler } from "../handlers/impl/RedGreenRefactorSubjectHandler";
import { RedGreenRefactorTypeHandler } from "../handlers/impl/RedGreenRefactorTypeHandler";
import { RedGreenRefactorHandler } from "../handlers/RedGreenRefactorHandler";

export class RedGreenRefactorHandlerFactory {
  private readonly configurationManager: ConfigurationManager;
  private promptManager: PromptManager;

  constructor(
    promptManager: PromptManager,
    configurationManager: ConfigurationManager
  ) {
    this.promptManager = promptManager;
    this.configurationManager = configurationManager;
  }

  public createTypeHandler(): RedGreenRefactorHandler {
    return new RedGreenRefactorTypeHandler(
      this.promptManager,
      this.configurationManager
    );
  }

  public createSubjectHandler(): RedGreenRefactorHandler {
    return new RedGreenRefactorSubjectHandler(
      this.promptManager,
      this.configurationManager
    );
  }

  public createBodyHandler(): RedGreenRefactorHandler {
    return new RedGreenRefactorBodyHandler(
      this.promptManager,
      this.configurationManager
    );
  }
}
