import { ProcessBuilderImpl } from "./ProcessBuilderImpl";
import { spawn, ChildProcessWithoutNullStreams } from "child_process";

jest.mock("child_process", () => ({
  spawn: jest.fn(),
}));

describe("ProcessBuilderImpl", () => {
  let processBuilder: ProcessBuilderImpl;

  beforeEach(() => {
    processBuilder = new ProcessBuilderImpl(["arg1", "arg2"]);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should initialize with given arguments", () => {
    expect(processBuilder).toBeInstanceOf(ProcessBuilderImpl);
    expect((processBuilder as any).args).toEqual(["arg1", "arg2"]);
  });

  it("should add a single argument", () => {
    processBuilder.addArg("arg3");
    expect((processBuilder as any).args).toEqual(["arg1", "arg2", "arg3"]);
  });

  it("should add multiple arguments", () => {
    processBuilder.addArgs(["arg3", "arg4"]);
    expect((processBuilder as any).args).toEqual([
      "arg1",
      "arg2",
      "arg3",
      "arg4",
    ]);
  });

  /* it("should spawn a child process with command and arguments", () => {
    const mockSpawn = spawn as jest.MockedFunction<typeof spawn>;
    const mockChildProcess: ChildProcessWithoutNullStreams =
      {} as ChildProcessWithoutNullStreams;
    mockSpawn.mockReturnValue(mockChildProcess);

    const result = processBuilder.spawn("test-command");

    expect(spawn).toHaveBeenCalledWith("test-command", ["arg1", "arg2"]);
    expect(result).toBe(mockChildProcess);
  }); */
});
