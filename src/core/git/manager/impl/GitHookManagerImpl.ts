import { promises as fs } from "fs";
import { join } from "path";
import { GitHookManager } from "../GitHookManager";

export class GitHookManagerImpl implements GitHookManager {
  private hooksDir: string;

  constructor(gitRoot: string) {
    this.hooksDir = join(gitRoot, ".git", "hooks");
  }

  public async installHook(hookName: string, script: string): Promise<void> {
    const hookPath = join(this.hooksDir, hookName);
    await fs.writeFile(hookPath, script, { encoding: "utf8", mode: 0o755 });
  }

  public async uninstallHook(hookName: string): Promise<void> {
    const hookPath = join(this.hooksDir, hookName);
    try {
      await fs.unlink(hookPath);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(
          `Failed to uninstall hook "${hookName}": ${error.message}`
        );
      }
    }
  }

  public async isHookInstalled(hookName: string): Promise<boolean> {
    const hookPath = join(this.hooksDir, hookName);
    try {
      await fs.access(hookPath, fs.constants.F_OK);
      return true;
    } catch (error: unknown) {
      return false;
    }
  }
}
