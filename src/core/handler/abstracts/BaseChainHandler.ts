import { ChainHandler } from "../interfaces/ChainHandler";

export abstract class BaseChainHandler<T> implements ChainHandler<T> {
  private nextHandler: ChainHandler<T> | null = null;

  public setNext(handler: ChainHandler<T>): ChainHandler<T> {
    if (this.nextHandler === null) {
      this.nextHandler = handler;
    } else {
      this.nextHandler.setNext(handler);
    }
    return this;
  }

  public async handle(builder: T): Promise<void> {
    await this.processInput(builder);
    if (this.nextHandler !== null) {
      await this.nextHandler.handle(builder);
    }
  }

  protected abstract processInput(builder: T): Promise<void>;

  protected abort(): void {
    this.nextHandler = null;
  }
}
