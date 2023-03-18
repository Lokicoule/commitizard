import { CommitHandler } from "../handlers/CommitHandler";

export interface CommitHandlerChainFactory {
  createCommitHandlerChain(): CommitHandler;
}
