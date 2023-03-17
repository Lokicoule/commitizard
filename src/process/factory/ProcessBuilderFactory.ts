import { ProcessBuilder } from "../builder/ProcessBuilder";
import { ProcessBuilderImpl } from "../builder/impl/ProcessBuilderImpl";

export class ProcessBuilderFactory {
  static create(args: string[] = []): ProcessBuilder {
    return new ProcessBuilderImpl(args);
  }
}
