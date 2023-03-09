import { CommitBuilder } from "../interface/commit-builder";
import { CommitBuilderImpl } from "../builder/commit-builder-impl";

export class CommitBuilderFactory {
  static create(): CommitBuilder {
    return new CommitBuilderImpl();
  }
}
