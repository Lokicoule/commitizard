import { ProcessBuilder } from "./ProcessBuilder";
import { ProcessBuilderImpl } from "./impl/ProcessBuilderImpl";

export class ProcessBuilderFactory {
  static create(
    args: string[] = [],
    options: Record<string, unknown> = {}
  ): ProcessBuilder {
    return new ProcessBuilderImpl(args, options);
  }
}
