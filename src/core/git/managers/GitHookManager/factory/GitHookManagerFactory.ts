import { GitHookManager } from "../GitHookManager";
import { GitHookManagerImpl } from "../impl/GitHookManagerImpl";

export class GitHookManagerFactory {
  public static create(): GitHookManager {
    return new GitHookManagerImpl();
  }
}
