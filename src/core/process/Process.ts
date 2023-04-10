import { ChildProcessWithoutNullStreams, spawn } from "child_process";

export class Process {
  private args: string[] = [];
  private options: Record<string, unknown> = {};

  private constructor(args: string[], options: Record<string, unknown> = {}) {
    this.args = args;
    this.options = options;
  }

  public static create(
    args: string[] = [],
    options: Record<string, unknown> = {}
  ): Process {
    return new Process(args, options);
  }

  public addArg(arg: string): Process {
    this.args.push(arg);
    return this;
  }

  public addArgs(args: string[]): Process {
    this.args.push(...args);
    return this;
  }

  public addOption(option: Record<string, unknown>): Process {
    this.options = { ...this.options, ...option };
    return this;
  }

  public spawn(command: string): ChildProcessWithoutNullStreams {
    return spawn(command, this.args, this.options);
  }
}
