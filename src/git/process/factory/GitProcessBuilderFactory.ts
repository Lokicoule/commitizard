import { GitProcessBuilder } from "../builder/GitProcessBuilder";
import { GitProcessBuilderImpl } from "../builder/impl/GitProcessBuilderImpl";

export class GitProcessBuilderFactory {
  static create(args: string[] = []): GitProcessBuilder {
    return new GitProcessBuilderImpl(args);
  }
}
