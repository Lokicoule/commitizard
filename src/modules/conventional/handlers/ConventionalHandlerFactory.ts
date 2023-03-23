import { ConfigurationManager } from "~/core/configuration";
import { PromptManager } from "~/core/prompt";
import { CommitHandler } from "~/modules/commit";
import { ConventionalBodyHandler } from "./ConventionalBodyHandler/ConventionalBodyHandler";
import { ConventionalBreakingChangesHandler } from "./ConventionalBreakingChangesHandler/ConventionalBreakingChangesHandler";
import { ConventionalFooterHandler } from "./ConventionalFooterHandler/ConventionalFooterHandler";
import { ConventionalReferencesHandler } from "./ConventionalReferencesHandler/ConventionalReferencesHandler";
import { ConventionalScopeHandler } from "./ConventionalScopeHandler/ConventionalScopeHandler";
import { ConventionalSubjectHandler } from "./ConventionalSubjectHandler/ConventionalSubjectHandler";
import { ConventionalTypeHandler } from "./ConventionalTypeHandler/ConventionalTypeHandler";

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

  public createTypeHandler(): CommitHandler {
    return new ConventionalTypeHandler(
      this.promptManager,
      this.configurationManager
    );
  }

  public createScopeHandler(): CommitHandler {
    return new ConventionalScopeHandler(
      this.promptManager,
      this.configurationManager
    );
  }

  public createSubjectHandler(): CommitHandler {
    return new ConventionalSubjectHandler(
      this.promptManager,
      this.configurationManager
    );
  }

  public createBreakingChangesHandler(): CommitHandler {
    return new ConventionalBreakingChangesHandler(
      this.promptManager,
      this.configurationManager
    );
  }

  public createReferencesHandler(): CommitHandler {
    return new ConventionalReferencesHandler(
      this.promptManager,
      this.configurationManager
    );
  }

  public createBodyHandler(): CommitHandler {
    return new ConventionalBodyHandler(
      this.promptManager,
      this.configurationManager
    );
  }

  public createFooterHandler(): CommitHandler {
    return new ConventionalFooterHandler(
      this.promptManager,
      this.configurationManager
    );
  }
}
