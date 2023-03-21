import { CommitBuilder } from "../builder/CommitBuilder";
import { CommitBuilderImpl } from "../builder/impl/CommitBuilderImpl";

export class CommitBuilderFactory {
  public static create(): CommitBuilder {
    return new CommitBuilderImpl();
  }
}
