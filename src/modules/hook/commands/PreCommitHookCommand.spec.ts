import { GitHookManager } from "~/core/git";
import { PreCommitHookCommand } from "./PreCommitHookCommand";

class TestPreCommitHookCommand extends PreCommitHookCommand {
  public exposedGetHookName(): string {
    return this.getHookName();
  }

  public exposedGetScript(): string {
    return this.getScript();
  }

  public exposedGetWindowsScript(): string {
    return this.getWindowsScript();
  }
}

describe("PreCommitHookCommand", () => {
  let gitHookManager: GitHookManager;
  let preCommitHookCommand: TestPreCommitHookCommand;

  beforeEach(() => {
    gitHookManager = {
      hookExists: jest.fn(),
      installHook: jest.fn(),
      uninstallHook: jest.fn(),
    } as unknown as GitHookManager;

    preCommitHookCommand = new TestPreCommitHookCommand(gitHookManager);
  });

  test("should have a hook name", () => {
    expect(preCommitHookCommand.exposedGetHookName()).toBe("pre-commit");
  });

  test("should have a script for Unix-based systems", () => {
    const expectedScript = `#!/bin/sh
    echo "Running pre-commit hook"
    if [ -z "$BYPASS_HOOKS" ]; then
      export BYPASS_HOOKS=1
      exec < /dev/tty
      node ./dist/bundle.js --from-hook
    fi`.trim();

    expect(preCommitHookCommand.exposedGetScript()).toBe(expectedScript);
  });

  test("should have a script for Windows", () => {
    const expectedScript = `@echo off
    echo Running pre-commit hook
    if not defined BYPASS_HOOKS (
      set BYPASS_HOOKS=1
      node ./dist/bundle.js --from-hook
    )`.trim();

    expect(preCommitHookCommand.exposedGetWindowsScript()).toBe(expectedScript);
  });

  test("should install hook if not exists", async () => {
    (gitHookManager.hookExists as jest.Mock).mockResolvedValue(false);
    await preCommitHookCommand.install();
    expect(gitHookManager.installHook).toHaveBeenCalled();
  });

  test("should not install hook if already exists", async () => {
    (gitHookManager.hookExists as jest.Mock).mockResolvedValue(true);
    await preCommitHookCommand.install();
    expect(gitHookManager.installHook).not.toHaveBeenCalled();
  });

  test("should uninstall hook if exists", async () => {
    (gitHookManager.hookExists as jest.Mock).mockResolvedValue(true);
    await preCommitHookCommand.uninstall();
    expect(gitHookManager.uninstallHook).toHaveBeenCalled();
  });

  test("should not uninstall hook if not exists", async () => {
    (gitHookManager.hookExists as jest.Mock).mockResolvedValue(false);
    await preCommitHookCommand.uninstall();
    expect(gitHookManager.uninstallHook).not.toHaveBeenCalled();
  });
});
