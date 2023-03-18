import { CommitHandler } from "../handlers/CommitHandler";

export interface CommitHandlerFactory {
  createCommitTypeHandler(): CommitHandler;
  createCommitScopeHandler(): CommitHandler;
  createCommitSubjectHandler(): CommitHandler;
  createCommitBreakingChangesHandler(): CommitHandler;
  createCommitReferencesHandler(): CommitHandler;
  createCommitBodyHandler(): CommitHandler;
  createCommitFooterHandler(): CommitHandler;
}
