import { ChildProcessWithoutNullStreams } from "child_process";

export interface ProcessBuilder {
  addArg(arg: string): ProcessBuilder;
  addArgs(args: string[]): ProcessBuilder;
  addOption(option: unknown): ProcessBuilder;
  spawn(command: string): ChildProcessWithoutNullStreams;
}
