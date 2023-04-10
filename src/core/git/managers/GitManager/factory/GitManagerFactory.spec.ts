import { GitManagerFactory } from "../..";
import { GitManagerOptions } from "../GitManagerOptions";
import { GitManagerImpl } from "../impl/GitManagerImpl";

describe("GitManagerFactory", () => {
  it("should create a GitManager", () => {
    expect(GitManagerFactory.create({} as GitManagerOptions)).toBeInstanceOf(
      GitManagerImpl
    );
  });
});
