import { CommitHandlerChain } from "../chain/CommitHandlerChain";

export interface CommitHandlerChainFactory {
  createCommitHandlerChain(): CommitHandlerChain;
}
