import { CommitHandler } from "../handlers/CommitHandler";

export interface ConventionalCommitHandlerChainFactory {
  createConventionalCommitHandlerChain(): CommitHandler;
}
