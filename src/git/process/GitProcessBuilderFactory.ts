import { GitProcessBuilder } from "./GitProcessBuilder";
import { GitProcessBuilderImpl } from "./GitProcessBuilderImpl";

export class GitProcessBuilderFactory {
  static create(args: string[] = []): GitProcessBuilder {
    return new GitProcessBuilderImpl(args);
  }
}
