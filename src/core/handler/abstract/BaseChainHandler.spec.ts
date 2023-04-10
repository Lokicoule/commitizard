import { BaseChainHandler } from "./BaseChainHandler";

describe("BaseChainHandler", () => {
  class String {
    public value: string = "";

    constructor(value: string) {
      this.value = value;
    }

    public append(value: string): void {
      this.value += value;
    }
  }
  class TestChainHandler extends BaseChainHandler<String> {
    protected async processInput(builder: String): Promise<void> {
      builder.append(" processed");
    }
  }

  class AbortChainHandler extends BaseChainHandler<String> {
    protected async processInput(builder: String): Promise<void> {
      builder.append(" processed");
      this.abort();
    }
  }

  test("BaseChainHandler should chain handlers in the correct order", async () => {
    const handler1 = new TestChainHandler();
    const handler2 = new TestChainHandler();
    const handler3 = new TestChainHandler();
    const handler4 = new TestChainHandler();
    handler1.setNext(handler2).setNext(handler3).setNext(handler4);

    const builder = new String("initial");
    await handler1.handle(builder);

    expect(builder.value).toBe(
      "initial processed processed processed processed"
    );
  });

  test("should abort chain of handlers", async () => {
    const handler1 = new TestChainHandler();
    const handler2 = new AbortChainHandler();
    const handler3 = new TestChainHandler();
    const handler4 = new TestChainHandler();

    handler1.setNext(handler2).setNext(handler3).setNext(handler4);

    const builder = new String("initial");
    await handler1.handle(builder);

    expect(builder.value).toBe("initial processed processed");
  });
});
