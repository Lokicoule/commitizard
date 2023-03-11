import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { GitProcessBuilder } from "../GitProcessBuilder";

export class GitProcessBuilderImpl implements GitProcessBuilder {
  private args: string[] = [];

  constructor(args: string[]) {
    this.args = args;
  }

  addArg(arg: string): GitProcessBuilder {
    this.args.push(arg);
    return this;
  }

  addArgs(args: string[]): GitProcessBuilder {
    this.args.push(...args);
    return this;
  }

  spawn(): ChildProcessWithoutNullStreams {
    return spawn("git", this.args);
  }
}
