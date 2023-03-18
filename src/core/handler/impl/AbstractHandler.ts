import { Handler } from "../Handler";

export abstract class AbstractHandler<T> implements Handler<T> {
  public async handle(input: T): Promise<void> {
    await this.processInput(input);
  }

  protected abstract processInput(input: T): Promise<void>;
}
