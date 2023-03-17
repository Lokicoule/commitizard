import { CommitBuilder } from "../../commit-old";

export abstract class CommitHandler {
  private nextHandler: CommitHandler | null = null;

  public setNext(handler: CommitHandler): CommitHandler {
    this.nextHandler = handler;
    return handler;
  }

  public async handle(commitBuilder: CommitBuilder): Promise<void> {
    if (this.nextHandler !== null) {
      await this.nextHandler.handle(commitBuilder);
    }
  }

  protected abstract processInput(commitBuilder: CommitBuilder): Promise<void>;
}
