import { CommitBodyHandler } from "../handlers/CommitBodyHandler";
import { CommitBreakingChangesHandler } from "../handlers/CommitBreakingChangesHandler";
import { CommitFooterHandler } from "../handlers/CommitFooterHandler";
import { CommitIssueNumbersHandler } from "../handlers/CommitIssueNumbersHandler";
import { CommitScopeHandler } from "../handlers/CommitScopeHandler";
import { CommitSubjectHandler } from "../handlers/CommitSubjectHandler";
import { CommitTypeHandler } from "../handlers/CommitTypeHandler";

export interface CommitHandlerFactory {
  createCommitTypeHandler(): CommitTypeHandler;
  createCommitScopeHandler(): CommitScopeHandler;
  createCommitSubjectHandler(): CommitSubjectHandler;
  createCommitBreakingChangesHandler(): CommitBreakingChangesHandler;
  createCommitIssueNumbersHandler(): CommitIssueNumbersHandler;
  createCommitBodyHandler(): CommitBodyHandler;
  createCommitFooterHandler(): CommitFooterHandler;
}
