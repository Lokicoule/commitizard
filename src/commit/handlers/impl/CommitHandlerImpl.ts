import { CommitBuilder } from "../../builder/CommitBuilder";
import { CommitHandler } from "../CommitHandler";

export abstract class CommitHandlerImpl implements CommitHandler {
  protected abstract processInput(commitBuilder: CommitBuilder): Promise<void>;

  public async handle(commitBuilder: CommitBuilder): Promise<void> {
    await this.processInput(commitBuilder);
  }
}
