import { GitManager } from "../managers";
import { GitManagerImpl } from "../managers/impl/GitManagerImpl";
import { GitManagerOptions } from "../types";

export class GitManagerFactory {
  public static create(options: GitManagerOptions): GitManager {
    return new GitManagerImpl(options);
  }
}
