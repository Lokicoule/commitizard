import { CommitBuilder } from "./CommitBuilder";
import { CommitBuilderImpl } from "./CommitBuilderImpl";

export class CommitBuilderFactory {
  static create(): CommitBuilder {
    return new CommitBuilderImpl();
  }
}
