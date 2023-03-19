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
  public createTypeHandler(): ConventionalHandler {
    return new ConventionalTypeHandler();
  }

  public createScopeHandler(): ConventionalHandler {
    return new ConventionalScopeHandler();
  }

  public createSubjectHandler(): ConventionalHandler {
    return new ConventionalSubjectHandler();
  }

  public createBreakingChangesHandler(): ConventionalHandler {
    return new ConventionalBreakingChangesHandler();
  }

  public createReferencesHandler(): ConventionalHandler {
    return new ConventionalReferencesHandler();
  }

  public createBodyHandler(): ConventionalHandler {
    return new ConventionalBodyHandler();
  }

  public createFooterHandler(): ConventionalHandler {
    return new ConventionalFooterHandler();
  }
}
