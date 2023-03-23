import { ProcessBuilder } from "./ProcessBuilder";
import { ProcessBuilderImpl } from "./impl/ProcessBuilderImpl";

export class ProcessBuilderFactory {
  static create(args: string[] = []): ProcessBuilder {
    return new ProcessBuilderImpl(args);
  }
}
