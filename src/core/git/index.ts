import { GitManager, GitHookManager } from "./interfaces";
import { GitManagerImpl, GitHookManagerImpl } from "./manager";
import { GitHookManagerOptions } from "./types/GitHookManagerOptions";
import { GitManagerOptions } from "./types/GitManagerOptions";

export { GitManager, GitManagerOptions, GitHookManager, GitHookManagerOptions };

export function createGitManager(options: GitManagerOptions): GitManager {
  return GitManagerImpl.create(options);
}

export function createGitHookManager(
  options: GitHookManagerOptions
): GitHookManager {
  return GitHookManagerImpl.create(options);
}
