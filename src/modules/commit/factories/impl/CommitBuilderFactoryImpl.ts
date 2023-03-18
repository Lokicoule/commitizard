import { CommitBuilder } from "../../builder/CommitBuilder";
import { CommitBuilderImpl } from "../../builder/impl/CommitBuilderImpl";

export class CommitBuilderFactoryImpl {
  public static create(): CommitBuilder {
    return new CommitBuilderImpl();
  }
}
