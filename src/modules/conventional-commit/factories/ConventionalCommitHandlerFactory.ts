import { CommitHandler } from "../handlers/CommitHandler";

export interface ConventionalCommitHandlerFactory {
  createConventionalCommitTypeHandler(): CommitHandler;
  createConventionalCommitScopeHandler(): CommitHandler;
  createConventionalCommitSubjectHandler(): CommitHandler;
  createConventionalCommitBreakingChangesHandler(): CommitHandler;
  createConventionalCommitReferencesHandler(): CommitHandler;
  createConventionalCommitBodyHandler(): CommitHandler;
  createConventionalCommitFooterHandler(): CommitHandler;
}
