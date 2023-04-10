import { ProcessImpl } from "./impl/ProcessImpl";
import { ProcessFactory } from "./ProcessFactory";

describe("ProcessFactory", () => {
  it("should create a process", () => {
    const process = ProcessFactory.create();
    expect(process).toBeInstanceOf(ProcessImpl);
  });
});
