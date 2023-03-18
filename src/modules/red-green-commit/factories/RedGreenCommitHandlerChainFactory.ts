import { CommitHandler } from "../../commit/handlers/CommitHandler";

export interface RedGreenCommitHandlerChainFactory {
  createRedGreenCommitHandlerChain(): CommitHandler;
}
