import { GitCommandRunner } from "../../../helpers";
import { CommitMessageManager } from "../../../helpers/CommitMessageManager";
import { GitManagerImpl } from "./GitManagerImpl";
import { GitManagerOptions } from "../GitManagerOptions";

jest.mock("../../../helpers/GitCommandRunner");
jest.mock("../../../helpers/CommitMessageManager");

describe("GitManagerImpl", () => {
  let gitManager: GitManagerImpl;
  let options: GitManagerOptions;
  let gitCommandRunner: GitCommandRunner;
  let commitMessageManager: CommitMessageManager;

  beforeEach(() => {
    options = {
      exclude: [],
    };
    gitCommandRunner = new GitCommandRunner(options);
    commitMessageManager = new CommitMessageManager();
    gitManager = new GitManagerImpl(options);
  });

  it("should create a new instance", () => {
    expect(gitManager).toBeInstanceOf(GitManagerImpl);
  });

  /* describe("commit", () => {
    it("should commit with commitFromHook if fromHook is true", async () => {
      options.fromHook = true;
      gitManager = new GitManagerImpl(options);
      commitMessageManager.commitFromHook = jest
        .fn()
        .mockResolvedValue(undefined);
      const message = "Test commit message";

      await gitManager.commit(message);

      //expect(commitMessageManager.commitFromHook).toHaveBeenCalledTimes(1);
      expect(commitMessageManager.commitFromHook).toHaveBeenCalledWith(message);
    });

    it("should commit with commitWithoutHook if fromHook is false or undefined", async () => {
      options.fromHook = false;
      gitManager = new GitManagerImpl(options);
      gitCommandRunner.commitWithoutHook = jest
        .fn()
        .mockResolvedValue(undefined);
      const message = "Test commit message";

      await gitManager.commit(message);

      expect(gitCommandRunner.commitWithoutHook).toHaveBeenCalledTimes(1);
      expect(gitCommandRunner.commitWithoutHook).toHaveBeenCalledWith(message);
    });
  }); */
});
