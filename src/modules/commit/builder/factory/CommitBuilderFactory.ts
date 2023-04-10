import { CommitBuilder } from "../CommitBuilder";
import { CommitBuilderImpl } from "../impl/CommitBuilderImpl";

export class CommitBuilderFactory {
  public static create(): CommitBuilder {
    return new CommitBuilderImpl();
  }
}
