import { GitManagerOptions } from "../types";
import { GitManager } from "./GitManager";
import { GitManagerImpl } from "./impl/GitManagerImpl";

export class GitManagerFactory {
  static create(options: GitManagerOptions): GitManager {
    return new GitManagerImpl(options);
  }
}
