import { CommitHandler } from "../../../commit/handlers/CommitHandler";
import { ConventionalCommitBodyHandlerImpl } from "../../handlers/impl/ConventionalCommitBodyHandlerImpl";
import { ConventionalCommitBreakingChangesHandlerImpl } from "../../handlers/impl/ConventionalCommitBreakingChangesHandlerImpl";
import { ConventionalCommitFooterHandlerImpl } from "../../handlers/impl/ConventionalCommitFooterHandlerImpl";
import { ConventionalCommitReferencesHandlerImpl } from "../../handlers/impl/ConventionalCommitReferencesHandlerImpl";
import { ConventionalCommitScopeHandlerImpl } from "../../handlers/impl/ConventionalCommitScopeHandlerImpl";
import { ConventionalCommitSubjectHandlerImpl } from "../../handlers/impl/ConventionalCommitSubjectHandlerImpl";
import { ConventionalCommitTypeHandlerImpl } from "../../handlers/impl/ConventionalCommitTypeHandlerImpl";
import { ConventionalCommitHandlerFactory } from "../ConventionalCommitHandlerFactory";

export class ConventionalCommitHandlerFactoryImpl
  implements ConventionalCommitHandlerFactory
{
  public createConventionalCommitTypeHandler(): CommitHandler {
    return new ConventionalCommitTypeHandlerImpl();
  }

  public createConventionalCommitScopeHandler(): CommitHandler {
    return new ConventionalCommitScopeHandlerImpl();
  }

  public createConventionalCommitSubjectHandler(): CommitHandler {
    return new ConventionalCommitSubjectHandlerImpl();
  }

  public createConventionalCommitBreakingChangesHandler(): CommitHandler {
    return new ConventionalCommitBreakingChangesHandlerImpl();
  }

  public createConventionalCommitReferencesHandler(): CommitHandler {
    return new ConventionalCommitReferencesHandlerImpl();
  }

  public createConventionalCommitBodyHandler(): CommitHandler {
    return new ConventionalCommitBodyHandlerImpl();
  }

  public createConventionalCommitFooterHandler(): CommitHandler {
    return new ConventionalCommitFooterHandlerImpl();
  }
}
