import { ConfigurationManager } from "~/core/configuration";
import { PromptManager } from "~/core/prompt";
import { ConventionalHandler } from "../handlers/ConventionalHandler";
import { ConventionalBodyHandler } from "../handlers/impl/ConventionalBodyHandler";
import { ConventionalBreakingChangesHandler } from "../handlers/impl/ConventionalBreakingChangesHandler";
import { ConventionalFooterHandler } from "../handlers/impl/ConventionalFooterHandler";
import { ConventionalReferencesHandler } from "../handlers/impl/ConventionalReferencesHandler";
import { ConventionalScopeHandler } from "../handlers/impl/ConventionalScopeHandler";
import { ConventionalSubjectHandler } from "../handlers/impl/ConventionalSubjectHandler";
import { ConventionalTypeHandler } from "../handlers/impl/ConventionalTypeHandler";

export class ConventionalHandlerFactory {
  private readonly configurationManager: ConfigurationManager;
  private readonly promptManager: PromptManager;

  constructor(
    promptManager: PromptManager,
    configurationManager: ConfigurationManager
  ) {
    this.configurationManager = configurationManager;
    this.promptManager = promptManager;
  }

  public createTypeHandler(): ConventionalHandler {
    return new ConventionalTypeHandler(
      this.promptManager,
      this.configurationManager
    );
  }

  public createScopeHandler(): ConventionalHandler {
    return new ConventionalScopeHandler(
      this.promptManager,
      this.configurationManager
    );
  }

  public createSubjectHandler(): ConventionalHandler {
    return new ConventionalSubjectHandler(
      this.promptManager,
      this.configurationManager
    );
  }

  public createBreakingChangesHandler(): ConventionalHandler {
    return new ConventionalBreakingChangesHandler(
      this.promptManager,
      this.configurationManager
    );
  }

  public createReferencesHandler(): ConventionalHandler {
    return new ConventionalReferencesHandler(
      this.promptManager,
      this.configurationManager
    );
  }

  public createBodyHandler(): ConventionalHandler {
    return new ConventionalBodyHandler(
      this.promptManager,
      this.configurationManager
    );
  }

  public createFooterHandler(): ConventionalHandler {
    return new ConventionalFooterHandler(
      this.promptManager,
      this.configurationManager
    );
  }
}
