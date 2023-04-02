import { GitManagerFactory } from "./GitManagerFactory";
import { GitManagerImpl } from "./impl/GitManagerImpl";

describe("GitManagerFactory", () => {
  it("should create a GitManager", () => {
    expect(
      GitManagerFactory.create({
        exclude: [],
      })
    ).toBeInstanceOf(GitManagerImpl);
  });
});
