import { Handler } from "../Handler";

export class HandlerPipeline<T> implements Handler<T> {
  private readonly handlers: Handler<T>[];

  public constructor(handlers: Handler<T>[]) {
    this.handlers = handlers;
  }

  public async handle(t: T): Promise<void> {
    for (const handler of this.handlers) {
      await handler.handle(t);
    }
  }
}
