import { GitCommandRunner } from "../../../helpers";
import { CommitMessageManager } from "../../../helpers/CommitMessageManager";
import { GitManagerImpl } from "./GitManagerImpl";
import { GitManagerOptions } from "../GitManagerOptions";

describe("GitManagerImpl", () => {
  let gitManagerOptions: GitManagerOptions;
  let gitManager: GitManagerImpl;
  let gitCommandRunner: GitCommandRunner;
  let commitMessageManager: CommitMessageManager;

  beforeEach(() => {
    gitManagerOptions = { exclude: [], fromHook: false };
    gitCommandRunner = new GitCommandRunner(gitManagerOptions);
    commitMessageManager = new CommitMessageManager();
    gitManager = new GitManagerImpl(
      gitManagerOptions,
      gitCommandRunner,
      commitMessageManager
    );
  });

  it("should get staged files", async () => {
    gitCommandRunner.getStagedFiles = jest.fn().mockResolvedValue([]);
    await gitManager.getStagedFiles();
    expect(gitCommandRunner.getStagedFiles).toHaveBeenCalledTimes(1);
  });

  it("should get created files", async () => {
    gitCommandRunner.getCreatedFiles = jest.fn().mockResolvedValue([]);
    await gitManager.getCreatedFiles();
    expect(gitCommandRunner.getCreatedFiles).toHaveBeenCalledTimes(1);
  });

  it("should get updated files", async () => {
    gitCommandRunner.getUpdatedFiles = jest.fn().mockResolvedValue([]);
    await gitManager.getUpdatedFiles();
    expect(gitCommandRunner.getUpdatedFiles).toHaveBeenCalledTimes(1);
  });

  it("should get deleted files", async () => {
    gitCommandRunner.getDeletedFiles = jest.fn().mockResolvedValue([]);
    await gitManager.getDeletedFiles();
    expect(gitCommandRunner.getDeletedFiles).toHaveBeenCalledTimes(1);
  });

  it("should check if the directory is a Git repository", async () => {
    gitCommandRunner.isGitRepository = jest.fn().mockResolvedValue(true);
    const result = await gitManager.isGitRepository();
    expect(result).toBe(true);
    expect(gitCommandRunner.isGitRepository).toHaveBeenCalledTimes(1);
  });

  it("should check if there are staged files", async () => {
    gitCommandRunner.hasStagedFiles = jest.fn().mockResolvedValue(true);
    const result = await gitManager.hasStagedFiles();
    expect(result).toBe(true);
    expect(gitCommandRunner.hasStagedFiles).toHaveBeenCalledTimes(1);
  });

  it("should stage files", async () => {
    gitCommandRunner.stageFiles = jest.fn().mockResolvedValue(undefined);
    const files = ["file1.txt", "file2.txt"];
    await gitManager.stageFiles(files);
    expect(gitCommandRunner.stageFiles).toHaveBeenCalledWith(files);
  });

  it("should commit with commitFromHook if fromHook is true", async () => {
    commitMessageManager.commitFromHook = jest

      .fn()
      .mockResolvedValue(undefined);
    gitCommandRunner.commitWithoutHook = jest.fn().mockResolvedValue(undefined);
    const message = "Test commit";
    gitManagerOptions.fromHook = true;

    await gitManager.commit(message);

    expect(commitMessageManager.commitFromHook).toHaveBeenCalledWith(message);
    expect(gitCommandRunner.commitWithoutHook).toHaveBeenCalledTimes(0);
  });

  it("should commit with commitWithoutHook if fromHook is false", async () => {
    commitMessageManager.commitFromHook = jest

      .fn()
      .mockResolvedValue(undefined);
    gitCommandRunner.commitWithoutHook = jest.fn().mockResolvedValue(undefined);
    const message = "Test commit";
    gitManagerOptions.fromHook = false;

    await gitManager.commit(message);

    expect(commitMessageManager.commitFromHook).toHaveBeenCalledTimes(0);
    expect(gitCommandRunner.commitWithoutHook).toHaveBeenCalledWith(message);
  });
});
