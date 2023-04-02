import { GitManagerImpl } from "./GitManagerImpl";
import { ProcessBuilderFactory } from "~/core/process/builder/ProcessBuilderFactory";
import { GitManagerOptions } from "../../types";
import { ChildProcessWithoutNullStreams } from "child_process";

jest.mock("~/core/process/builder/ProcessBuilderFactory");

describe("GitManagerImpl", () => {
  let gitManager: GitManagerImpl;
  let options: GitManagerOptions;
  let mockProcess: ChildProcessWithoutNullStreams;

  beforeEach(() => {
    options = {
      exclude: [],
    };
    gitManager = new GitManagerImpl(options);

    mockProcess = {
      stdout: new (require("stream").Readable)(),
      stderr: new (require("stream").Readable)(),
    } as ChildProcessWithoutNullStreams;

    (ProcessBuilderFactory.create as jest.Mock).mockReturnValue({
      addArgs: jest.fn().mockReturnThis(),
      spawn: jest.fn().mockReturnValue(mockProcess),
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should get staged files", async () => {
    const stagedFiles = "file1.txt\nfile2.txt\n";
    mockProcess.stdout.push(stagedFiles);
    mockProcess.stdout.push(null);

    const result = await gitManager.getStagedFiles();

    expect(result).toEqual(["file1.txt", "file2.txt"]);
  });

  it("should get created files", async () => {
    const output = "?? file1.txt\n?? file2.txt\n";
    mockProcess.stdout.push(output);
    mockProcess.stdout.push(null);

    const result = await gitManager.getCreatedFiles();

    expect(result).toEqual(["file1.txt", "file2.txt"]);
  });
  it("should get updated files", async () => {
    const updatedFiles = "file1.txt\nfile2.txt\n";
    mockProcess.stdout.push(updatedFiles);
    mockProcess.stdout.push(null);

    const result = await gitManager.getUpdatedFiles();

    expect(result).toEqual(["file1.txt", "file2.txt"]);
  });

  it("should get deleted files", async () => {
    const deletedFiles = "file1.txt\nfile2.txt\n";
    mockProcess.stdout.push(deletedFiles);
    mockProcess.stdout.push(null);

    const result = await gitManager.getDeletedFiles();

    expect(result).toEqual(["file1.txt", "file2.txt"]);
  });

  it("should check if the directory is a Git repository", async () => {
    mockProcess.stdout.push("true\n");
    mockProcess.stdout.push(null);

    const result = await gitManager.isGitRepository();

    expect(result).toBe(true);
  });

  it("should check if there are staged files", async () => {
    const stagedFiles = "file1.txt\nfile2.txt\n";
    mockProcess.stdout.push(stagedFiles);
    mockProcess.stdout.push(null);

    const result = await gitManager.hasStagedFiles();

    expect(result).toBe(true);
  });

  it("should stage files", async () => {
    mockProcess.stdout.push(null);

    await gitManager.stageFiles(["file1.txt", "file2.txt"]);

    expect(ProcessBuilderFactory.create().addArgs).toHaveBeenCalledWith([
      "add",
      "file1.txt",
      "file2.txt",
    ]);
  });

  it("should commit with a message", async () => {
    mockProcess.stdout.push(null);

    await gitManager.commit("Test commit message");

    expect(ProcessBuilderFactory.create().addArgs).toHaveBeenCalledWith([
      "commit",
      "-m",
      "Test commit message",
    ]);
  });

  it("should exclude files when getting staged files", async () => {
    const output = "file1.txt\nfile3.txt\n";
    mockProcess.stdout.push(output);
    mockProcess.stdout.push(null);

    options.exclude = ["file2.txt"];
    gitManager = new GitManagerImpl(options);

    const result = await gitManager.getStagedFiles();

    expect(result).toEqual(["file1.txt", "file3.txt"]);
    expect(ProcessBuilderFactory.create().addArgs).toHaveBeenCalledWith([
      "diff",
      "--cached",
      "--name-only",
      ":(exclude)file2.txt",
    ]);
  });

  it("should exclude files when getting updated files", async () => {
    const output = "file1.txt\nfile3.txt\n";
    mockProcess.stdout.push(output);
    mockProcess.stdout.push(null);

    options.exclude = ["file2.txt"];
    gitManager = new GitManagerImpl(options);

    const result = await gitManager.getUpdatedFiles();

    expect(result).toEqual(["file1.txt", "file3.txt"]);
    expect(ProcessBuilderFactory.create().addArgs).toHaveBeenCalledWith([
      "diff",
      "--name-only",
      "--diff-filter=M",
      ":(exclude)file2.txt",
    ]);
  });

  it("should exclude files when getting deleted files", async () => {
    const output = "file1.txt\nfile3.txt\n";
    mockProcess.stdout.push(output);
    mockProcess.stdout.push(null);

    options.exclude = ["file2.txt"];
    gitManager = new GitManagerImpl(options);

    const result = await gitManager.getDeletedFiles();

    expect(result).toEqual(["file1.txt", "file3.txt"]);
    expect(ProcessBuilderFactory.create().addArgs).toHaveBeenCalledWith([
      "diff",
      "--name-only",
      "--diff-filter=D",
      ":(exclude)file2.txt",
    ]);
  });

  it("should handle error in streamToString", async () => {
    const errorMessage = "Stream error";

    process.nextTick(() => {
      mockProcess.stdout.emit("error", new Error(errorMessage));
    });

    try {
      await gitManager.getStagedFiles();
    } catch (error: any) {
      expect(error.message).toEqual(errorMessage);
    }
  });
});
