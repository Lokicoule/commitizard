export interface Handler<T> {
  handle(t: T): Promise<void>;
}
