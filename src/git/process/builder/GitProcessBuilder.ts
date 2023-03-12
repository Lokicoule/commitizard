import { ChildProcessWithoutNullStreams } from "child_process";

export interface GitProcessBuilder {
  addArg(arg: string): GitProcessBuilder;
  spawn(): ChildProcessWithoutNullStreams;
}
