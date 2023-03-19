import { Config } from "../../../../core/config";
import { PromptManager } from "../../../../libs/prompt";
import { ConventionalHandler } from "../../handlers/ConventionalHandler";
import { ConventionalBodyHandler } from "../../handlers/impl/ConventionalBodyHandler";
import { ConventionalBreakingChangesHandler } from "../../handlers/impl/ConventionalBreakingChangesHandler";
import { ConventionalFooterHandler } from "../../handlers/impl/ConventionalFooterHandler";
import { ConventionalReferencesHandler } from "../../handlers/impl/ConventionalReferencesHandler";
import { ConventionalScopeHandler } from "../../handlers/impl/ConventionalScopeHandler";
import { ConventionalSubjectHandler } from "../../handlers/impl/ConventionalSubjectHandler";
import { ConventionalTypeHandler } from "../../handlers/impl/ConventionalTypeHandler";
import { ConventionalHandlerFactory } from "../ConventionalHandlerFactory";

export class ConventionalHandlerFactoryImpl
  implements ConventionalHandlerFactory
{
  private configuration: Config;
  private promptManager: PromptManager;

  constructor(promptManager: PromptManager, configuration: Config) {
    this.configuration = configuration;
    this.promptManager = promptManager;
  }

  public createTypeHandler(): ConventionalHandler {
    return new ConventionalTypeHandler(this.promptManager, this.configuration);
  }

  public createScopeHandler(): ConventionalHandler {
    return new ConventionalScopeHandler(this.promptManager, this.configuration);
  }

  public createSubjectHandler(): ConventionalHandler {
    return new ConventionalSubjectHandler(
      this.promptManager,
      this.configuration
    );
  }

  public createBreakingChangesHandler(): ConventionalHandler {
    return new ConventionalBreakingChangesHandler(
      this.promptManager,
      this.configuration
    );
  }

  public createReferencesHandler(): ConventionalHandler {
    return new ConventionalReferencesHandler(
      this.promptManager,
      this.configuration
    );
  }

  public createBodyHandler(): ConventionalHandler {
    return new ConventionalBodyHandler(this.promptManager, this.configuration);
  }

  public createFooterHandler(): ConventionalHandler {
    return new ConventionalFooterHandler(
      this.promptManager,
      this.configuration
    );
  }
}
