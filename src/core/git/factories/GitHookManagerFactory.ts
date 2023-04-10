import { GitHookManager } from "../managers";
import { GitHookManagerImpl } from "../managers/impl/GitHookManagerImpl";

export class GitHookManagerFactory {
  public static create(): GitHookManager {
    return new GitHookManagerImpl();
  }
}
