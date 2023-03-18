import { CommitHandler } from "../../commit/handlers/CommitHandler";

export interface ConventionalCommitHandlerChainFactory {
  createConventionalCommitHandlerChain(): CommitHandler;
}
