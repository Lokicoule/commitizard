import { ChildProcessWithoutNullStreams } from "child_process";

export interface Process {
  addArg(arg: string): Process;
  addArgs(args: string[]): Process;
  addOption(option: Record<string, unknown>): Process;
  spawn(command: string): ChildProcessWithoutNullStreams;
}
