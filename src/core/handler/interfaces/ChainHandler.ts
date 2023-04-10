export interface ChainHandler<T> {
  setNext(handler: ChainHandler<T>): ChainHandler<T>;
  handle(builder: T): Promise<void>;
}
