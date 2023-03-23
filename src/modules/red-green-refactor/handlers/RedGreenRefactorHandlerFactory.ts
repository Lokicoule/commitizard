import { ConfigurationManager } from "~/core/configuration";
import { PromptManager } from "~/core/prompt";
import { CommitHandler } from "~/modules/commit";
import { RedGreenRefactorBodyHandler } from "./RedGreenRefactorBodyHandler/RedGreenRefactorBodyHandler";
import { RedGreenRefactorSubjectHandler } from "./RedGreenRefactorSubjectHandler/RedGreenRefactorSubjectHandler";
import { RedGreenRefactorTypeHandler } from "./RedGreenRefactorTypeHandler/RedGreenRefactorTypeHandler";

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

  public createTypeHandler(): CommitHandler {
    return new RedGreenRefactorTypeHandler(
      this.promptManager,
      this.configurationManager
    );
  }

  public createSubjectHandler(): CommitHandler {
    return new RedGreenRefactorSubjectHandler(
      this.promptManager,
      this.configurationManager
    );
  }

  public createBodyHandler(): CommitHandler {
    return new RedGreenRefactorBodyHandler(
      this.promptManager,
      this.configurationManager
    );
  }
}
