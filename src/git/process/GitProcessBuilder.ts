import { ChildProcessWithoutNullStreams, spawn } from "child_process";

export interface GitProcessBuilder {
  addArg(arg: string): GitProcessBuilder;
  addArgs(args: string[]): GitProcessBuilder;
  spawn(): ChildProcessWithoutNullStreams;
}
