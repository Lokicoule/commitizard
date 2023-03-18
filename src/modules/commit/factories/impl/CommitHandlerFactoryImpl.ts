import { CommitBodyHandler } from "../../handlers/CommitBodyHandler";
import { CommitBreakingChangesHandler } from "../../handlers/CommitBreakingChangesHandler";
import { CommitFooterHandler } from "../../handlers/CommitFooterHandler";
import { CommitIssueNumbersHandler } from "../../handlers/CommitIssueNumbersHandler";
import { CommitScopeHandler } from "../../handlers/CommitScopeHandler";
import { CommitSubjectHandler } from "../../handlers/CommitSubjectHandler";
import { CommitTypeHandler } from "../../handlers/CommitTypeHandler";
import { CommitBodyHandlerImpl } from "../../handlers/impl/CommitBodyHandlerImpl";
import { CommitBreakingChangesHandlerImpl } from "../../handlers/impl/CommitBreakingChangesHandlerImpl";
import { CommitFooterHandlerImpl } from "../../handlers/impl/CommitFooterHandlerImpl";
import { CommitIssueNumbersHandlerImpl } from "../../handlers/impl/CommitIssueNumbersHandlerImpl";
import { CommitScopeHandlerImpl } from "../../handlers/impl/CommitScopeHandlerImpl";
import { CommitSubjectHandlerImpl } from "../../handlers/impl/CommitSubjectHandlerImpl";
import { CommitTypeHandlerImpl } from "../../handlers/impl/CommitTypeHandlerImpl";
import { CommitHandlerFactory } from "../CommitHandlerFactory";

export class CommitHandlerFactoryImpl implements CommitHandlerFactory {
  public createCommitTypeHandler(): CommitTypeHandler {
    return new CommitTypeHandlerImpl();
  }

  public createCommitScopeHandler(): CommitScopeHandler {
    return new CommitScopeHandlerImpl();
  }

  public createCommitSubjectHandler(): CommitSubjectHandler {
    return new CommitSubjectHandlerImpl();
  }

  public createCommitBreakingChangesHandler(): CommitBreakingChangesHandler {
    return new CommitBreakingChangesHandlerImpl();
  }

  public createCommitIssueNumbersHandler(): CommitIssueNumbersHandler {
    return new CommitIssueNumbersHandlerImpl();
  }

  public createCommitBodyHandler(): CommitBodyHandler {
    return new CommitBodyHandlerImpl();
  }

  public createCommitFooterHandler(): CommitFooterHandler {
    return new CommitFooterHandlerImpl();
  }
}
