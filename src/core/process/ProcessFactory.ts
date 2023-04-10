import { Process } from "./Process";
import { ProcessImpl } from "./impl/ProcessImpl";

export class ProcessFactory {
  static create(
    args: string[] = [],
    options: Record<string, unknown> = {}
  ): Process {
    return new ProcessImpl(args, options);
  }
}
