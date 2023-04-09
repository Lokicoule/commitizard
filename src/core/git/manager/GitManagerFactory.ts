import { FilesystemAdapter } from "~/adapters/filesystem";
import { GitManagerOptions } from "../types";
import { GitHookManager } from "./GitHookManager";
import { GitManager } from "./GitManager";
import { GitHookManagerImpl } from "./impl/GitHookManagerImpl";
import { GitManagerImpl } from "./impl/GitManagerImpl";

export class GitManagerFactory {
  static create(options: GitManagerOptions): GitManager {
    return new GitManagerImpl(options);
  }

  static createHookManager(): GitHookManager {
    return new GitHookManagerImpl(process.cwd());
  }
}
