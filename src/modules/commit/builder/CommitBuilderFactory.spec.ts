import { CommitBuilderFactory } from "./CommitBuilderFactory";
import { CommitBuilderImpl } from "./impl/CommitBuilderImpl";

describe("CommitBuilderFactory", () => {
  it("should create a CommitBuilder", () => {
    expect(CommitBuilderFactory.create()).toBeInstanceOf(CommitBuilderImpl);
  });
});
