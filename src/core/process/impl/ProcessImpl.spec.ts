import { ProcessImpl } from "./ProcessImpl";
import { spawn, ChildProcessWithoutNullStreams } from "child_process";

jest.mock("child_process", () => ({
  spawn: jest.fn(),
}));

describe("ProcessImpl", () => {
  let process: ProcessImpl;

  beforeEach(() => {
    process = new ProcessImpl(["arg1", "arg2"]);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should initialize with given arguments", () => {
    expect(process).toBeInstanceOf(ProcessImpl);
    expect((process as any).args).toEqual(["arg1", "arg2"]);
  });

  it("should add a single argument", () => {
    process.addArg("arg3");
    expect((process as any).args).toEqual(["arg1", "arg2", "arg3"]);
  });

  it("should add multiple arguments", () => {
    process.addArgs(["arg3", "arg4"]);
    expect((process as any).args).toEqual(["arg1", "arg2", "arg3", "arg4"]);
  });

  it("should spawn a child process with command and arguments", () => {
    const mockSpawn = spawn as jest.MockedFunction<typeof spawn>;
    const mockChildProcess: ChildProcessWithoutNullStreams =
      {} as ChildProcessWithoutNullStreams;
    mockSpawn.mockReturnValue(mockChildProcess);
    process.addArg("arg3").addArgs(["arg4", "arg5"]);
    const result = process.spawn("test-command");
    expect(spawn).toHaveBeenCalledWith(
      "test-command",
      ["arg1", "arg2", "arg3", "arg4", "arg5"],
      {}
    );
    expect(result).toBe(mockChildProcess);
  });

  it("should spawn a child process with command, arguments and options", () => {
    const mockSpawn = spawn as jest.MockedFunction<typeof spawn>;
    const mockChildProcess: ChildProcessWithoutNullStreams =
      {} as ChildProcessWithoutNullStreams;
    mockSpawn.mockReturnValue(mockChildProcess);
    process.addArg("arg3").addArgs(["arg4", "arg5"]);
    process.addOption({ cwd: "/test" });
    const result = process.spawn("test-command");
    expect(spawn).toHaveBeenCalledWith(
      "test-command",
      ["arg1", "arg2", "arg3", "arg4", "arg5"],
      {
        cwd: "/test",
      }
    );
    expect(result).toBe(mockChildProcess);
  });
});
