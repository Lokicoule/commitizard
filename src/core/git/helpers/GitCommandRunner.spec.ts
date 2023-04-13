import { ChildProcessWithoutNullStreams } from "child_process";
import { ProcessFactory } from "~/core/process/ProcessFactory";
import { GitManagerOptions } from "../managers";
import { GitCommandRunner } from "./GitCommandRunner";

jest.mock("fs", () => ({
  promises: {
    writeFile: jest.fn(),
    access: jest.fn(),
    appendFile: jest.fn(),
    readFile: jest.fn(),
    rename: jest.fn(),
  },
}));

jest.mock("~/core/process/ProcessFactory");

describe("GitCommandRunner", () => {
  let gitRunner: GitCommandRunner;
  let options: GitManagerOptions;
  let mockProcess: ChildProcessWithoutNullStreams;

  beforeEach(() => {
    options = {
      exclude: [],
    };
    gitRunner = new GitCommandRunner(options);

    mockProcess = {
      stdout: new (require("stream").Readable)(),
      stderr: new (require("stream").Readable)(),
    } as ChildProcessWithoutNullStreams;

    (ProcessFactory.create as jest.Mock).mockReturnValue({
      addArgs: jest.fn().mockReturnThis(),
      addOption: jest.fn().mockReturnThis(),
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

    const result = await gitRunner.getStagedFiles();

    expect(result).toEqual(["file1.txt", "file2.txt"]);
  });

  it("should get created files", async () => {
    const output = "?? file1.txt\n?? file2.txt\n";
    mockProcess.stdout.push(output);
    mockProcess.stdout.push(null);

    const result = await gitRunner.getCreatedFiles();

    expect(result).toEqual(["file1.txt", "file2.txt"]);
  });
  it("should get updated files", async () => {
    const updatedFiles = "file1.txt\nfile2.txt\n";
    mockProcess.stdout.push(updatedFiles);
    mockProcess.stdout.push(null);

    const result = await gitRunner.getUpdatedFiles();

    expect(result).toEqual(["file1.txt", "file2.txt"]);
  });

  it("should get deleted files", async () => {
    const deletedFiles = "file1.txt\nfile2.txt\n";
    mockProcess.stdout.push(deletedFiles);
    mockProcess.stdout.push(null);

    const result = await gitRunner.getDeletedFiles();

    expect(result).toEqual(["file1.txt", "file2.txt"]);
  });

  it("should check if the directory is a Git repository", async () => {
    mockProcess.stdout.push("true\n");
    mockProcess.stdout.push(null);

    const result = await gitRunner.isGitRepository();

    expect(result).toBe(true);
  });

  it("should check if there are staged files", async () => {
    const stagedFiles = "file1.txt\nfile2.txt\n";
    mockProcess.stdout.push(stagedFiles);
    mockProcess.stdout.push(null);

    const result = await gitRunner.hasStagedFiles();

    expect(result).toBe(true);
  });

  it("should stage files", async () => {
    mockProcess.stdout.push(null);

    await gitRunner.stageFiles(["file1.txt", "file2.txt"]);

    expect(ProcessFactory.create().addArgs).toHaveBeenCalledWith([
      "add",
      "file1.txt",
      "file2.txt",
    ]);
  });

  it("should exclude files when getting staged files", async () => {
    const output = "file1.txt\nfile3.txt\n";
    mockProcess.stdout.push(output);
    mockProcess.stdout.push(null);

    options.exclude = ["file2.txt"];
    gitRunner = new GitCommandRunner(options);

    const result = await gitRunner.getStagedFiles();

    expect(result).toEqual(["file1.txt", "file3.txt"]);
    expect(ProcessFactory.create().addArgs).toHaveBeenCalledWith([
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
    gitRunner = new GitCommandRunner(options);

    const result = await gitRunner.getUpdatedFiles();

    expect(result).toEqual(["file1.txt", "file3.txt"]);
    expect(ProcessFactory.create().addArgs).toHaveBeenCalledWith([
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
    gitRunner = new GitCommandRunner(options);

    const result = await gitRunner.getDeletedFiles();

    expect(result).toEqual(["file1.txt", "file3.txt"]);
    expect(ProcessFactory.create().addArgs).toHaveBeenCalledWith([
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
      await gitRunner.getStagedFiles();
    } catch (error: any) {
      expect(error.message).toEqual(errorMessage);
    }
  });

  it("should return an empty array if no staged files are found", async () => {
    mockProcess.stdout.push(null);

    const result = await gitRunner.getStagedFiles();

    expect(result).toEqual([]);
  });

  it("should return an empty array if no updated files are found", async () => {
    mockProcess.stdout.push(null);

    const result = await gitRunner.getUpdatedFiles();

    expect(result).toEqual([]);
  });

  it("should return an empty array if no deleted files are found", async () => {
    mockProcess.stdout.push(null);

    const result = await gitRunner.getDeletedFiles();

    expect(result).toEqual([]);
  });

  it("should commit without hooks", async () => {
    mockProcess.stdout.push(null);

    const commitMessage = "Test commit";
    await gitRunner.commitWithoutHook(commitMessage);

    expect(ProcessFactory.create().addArgs).toHaveBeenCalledWith([
      "commit",
      "-m",
      commitMessage,
    ]);

    expect(ProcessFactory.create().addOption).toHaveBeenCalledWith({
      env: {
        ...process.env,
        COMMITIZARD_BYPASS: "1",
      },
    });
  });
});
