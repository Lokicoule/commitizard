import { CommitBuilder } from "../../builder/CommitBuilder";
import { CommitHandler } from "../../handlers/CommitHandler";
import { CommitHandlerChain } from "../CommitHandlerChain";

export class CommitHandlerChainImpl implements CommitHandlerChain {
  private commitHandlers: CommitHandler[];

  constructor(commitHandlers: CommitHandler[]) {
    this.commitHandlers = commitHandlers;
  }

  public async handle(commitBuilder: CommitBuilder): Promise<void> {
    for (const commitHandler of this.commitHandlers) {
      await commitHandler.handle(commitBuilder);
    }
  }
}
