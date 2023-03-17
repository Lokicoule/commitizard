import { CommitBuilder } from "../../builder/CommitBuilder";
import { CommitBuilderImpl } from "../../builder/impl/CommitBuilderImpl";
import { CommitBuilderFactory } from "../CommitBuilderFactory";

export class CommitBuilderFactoryImpl implements CommitBuilderFactory {
  public createCommitBuilder(): CommitBuilder {
    return new CommitBuilderImpl();
  }
}
