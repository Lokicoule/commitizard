import { ChildProcessWithoutNullStreams } from "child_process";

export interface ProcessBuilder {
  addArg(arg: string): ProcessBuilder;
  spawn(command: string): ChildProcessWithoutNullStreams;
}
