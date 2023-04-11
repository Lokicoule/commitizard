/**
 * Git hook manager interface.
 * @interface
 * @category Core
 * @subcategory Git
 * @public
 * @name GitHookManager
 * @description
 * This interface defines the methods that a git hook manager must implement.
 * @method installHook - Installs a git hook.
 * @method uninstallHook - Uninstalls a git hook.
 * @method isHookInstalled - Checks if a git hook is installed.
 */
export interface GitHookManager {
  installHook(hookName: string, script: string): Promise<void>;
  uninstallHook(hookName: string): Promise<void>;
  hookExists(hookName: string): Promise<boolean>;
}
