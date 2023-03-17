import { CommitBuilder } from "../builder/CommitBuilder";

export interface CommitHandlerChain {
  handle(commitBuilder: CommitBuilder): Promise<void>;
}
