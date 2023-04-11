import { Command } from "commandzen";
import { GitHookManager } from "~/core/git";

export abstract class BaseHookCommand {
  protected gitHookManager: GitHookManager;

  constructor(gitHookManager: GitHookManager) {
    this.gitHookManager = gitHookManager;
  }

  abstract createCommand(): Command;
}
