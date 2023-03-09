import { GitProcessBuilder } from "../interface/git-process-builder";
import { GitProcessBuilderImpl } from "../builder/git-process-builder-impl";

export class GitProcessBuilderFactory {
  static create(args: string[] = []): GitProcessBuilder {
    return new GitProcessBuilderImpl(args);
  }
}
