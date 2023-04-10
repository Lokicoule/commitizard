import { GitHookManagerImpl } from "../impl/GitHookManagerImpl";
import { GitHookManagerFactory } from "./GitHookManagerFactory";

describe("GitHookManagerFactory", () => {
  it("should create a GitHookManager", () => {
    expect(GitHookManagerFactory.create()).toBeInstanceOf(GitHookManagerImpl);
  });
});
