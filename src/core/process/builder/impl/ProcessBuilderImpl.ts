import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { ProcessBuilder } from "../ProcessBuilder";

export class ProcessBuilderImpl implements ProcessBuilder {
  private args: string[] = [];
  private options: Record<string, unknown> = {};

  constructor(args: string[], options: Record<string, unknown> = {}) {
    this.args = args;
    this.options = options;
  }

  addArg(arg: string): ProcessBuilder {
    this.args.push(arg);
    return this;
  }

  addArgs(args: string[]): ProcessBuilder {
    this.args.push(...args);
    return this;
  }

  addOption(option: Record<string, unknown>): ProcessBuilder {
    this.options = { ...this.options, ...option };
    return this;
  }

  spawn(command: string): ChildProcessWithoutNullStreams {
    return spawn(command, this.args, this.options);
  }
}
