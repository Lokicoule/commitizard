import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { Process } from "../Process";

export class ProcessImpl implements Process {
  private args: string[] = [];
  private options: Record<string, unknown> = {};

  constructor(args: string[], options: Record<string, unknown> = {}) {
    this.args = args;
    this.options = options;
  }

  addArg(arg: string): Process {
    this.args.push(arg);
    return this;
  }

  addArgs(args: string[]): Process {
    this.args.push(...args);
    return this;
  }

  addOption(option: Record<string, unknown>): Process {
    this.options = { ...this.options, ...option };
    return this;
  }

  spawn(command: string): ChildProcessWithoutNullStreams {
    return spawn(command, this.args, this.options);
  }
}
