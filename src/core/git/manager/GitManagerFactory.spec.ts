import { GitManagerFactory } from "./GitManagerFactory";
import { GitHookManagerImpl } from "./impl/GitHookManagerImpl";
import { GitManagerImpl } from "./impl/GitManagerImpl";

describe("GitManagerFactory", () => {
  it("should create a GitManager", () => {
    expect(
      GitManagerFactory.create({
        exclude: [],
      })
    ).toBeInstanceOf(GitManagerImpl);
  });

  it("should create a GitHookManager", () => {
    expect(GitManagerFactory.createHookManager()).toBeInstanceOf(
      GitHookManagerImpl
    );
  });
});
