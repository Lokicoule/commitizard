import { GitHookManager } from "~/core/git";

export abstract class BaseHookCommand {
  constructor(protected gitHookManager: GitHookManager) {}

  protected abstract getHookName(): string;
  protected abstract getScript(): string;
  protected abstract getWindowsScript(): string;

  public async install(): Promise<void> {
    if (await this.gitHookManager.hookExists(this.getHookName())) {
      console.warn(`${this.getHookName()} hook already exists.`);
      return;
    }
    await this.gitHookManager.installHook(
      this.getHookName(),
      process.platform === "win32" ? this.getWindowsScript() : this.getScript()
    );
  }

  public async uninstall(): Promise<void> {
    if (!(await this.gitHookManager.hookExists(this.getHookName()))) {
      console.warn(`${this.getHookName()} hook does not exist.`);
      return;
    }
    await this.gitHookManager.uninstallHook(this.getHookName());
  }
}
