import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { ProcessBuilder } from "../ProcessBuilder";

export class ProcessBuilderImpl implements ProcessBuilder {
  private args: string[] = [];

  constructor(args: string[]) {
    this.args = args;
  }

  addArg(arg: string): ProcessBuilder {
    this.args.push(arg);
    return this;
  }

  spawn(command: string): ChildProcessWithoutNullStreams {
    return spawn(command, this.args);
  }
}
