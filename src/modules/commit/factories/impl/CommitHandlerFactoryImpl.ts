import { CommitHandler } from "../../handlers/CommitHandler";
import { CommitBodyHandlerImpl } from "../../handlers/impl/CommitBodyHandlerImpl";
import { CommitBreakingChangesHandlerImpl } from "../../handlers/impl/CommitBreakingChangesHandlerImpl";
import { CommitFooterHandlerImpl } from "../../handlers/impl/CommitFooterHandlerImpl";
import { CommitIssueNumbersHandlerImpl } from "../../handlers/impl/CommitIssueNumbersHandlerImpl";
import { CommitScopeHandlerImpl } from "../../handlers/impl/CommitScopeHandlerImpl";
import { CommitSubjectHandlerImpl } from "../../handlers/impl/CommitSubjectHandlerImpl";
import { CommitTypeHandlerImpl } from "../../handlers/impl/CommitTypeHandlerImpl";
import { CommitHandlerFactory } from "../CommitHandlerFactory";

export class CommitHandlerFactoryImpl implements CommitHandlerFactory {
  public createCommitTypeHandler(): CommitHandler {
    return new CommitTypeHandlerImpl();
  }

  public createCommitScopeHandler(): CommitHandler {
    return new CommitScopeHandlerImpl();
  }

  public createCommitSubjectHandler(): CommitHandler {
    return new CommitSubjectHandlerImpl();
  }

  public createCommitBreakingChangesHandler(): CommitHandler {
    return new CommitBreakingChangesHandlerImpl();
  }

  public createCommitIssueNumbersHandler(): CommitHandler {
    return new CommitIssueNumbersHandlerImpl();
  }

  public createCommitBodyHandler(): CommitHandler {
    return new CommitBodyHandlerImpl();
  }

  public createCommitFooterHandler(): CommitHandler {
    return new CommitFooterHandlerImpl();
  }
}
