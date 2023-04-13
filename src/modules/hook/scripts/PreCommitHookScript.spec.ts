import { GitHookManager } from "~/core/git";
import { PreCommitHookScript } from "./PreCommitHookScript";

class TestPreCommitHookScript extends PreCommitHookScript {
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

describe("PreCommitHookScript", () => {
  let gitHookManager: GitHookManager;
  let preCommitHookScript: TestPreCommitHookScript;

  beforeEach(() => {
    gitHookManager = {
      hookExists: jest.fn(),
      installHook: jest.fn(),
      uninstallHook: jest.fn(),
    } as unknown as GitHookManager;

    preCommitHookScript = new TestPreCommitHookScript(gitHookManager);
  });

  test("should have a hook name", () => {
    expect(preCommitHookScript.exposedGetHookName()).toBe("pre-commit");
  });

  test("should have a script for Unix-based systems", () => {
    const expectedScript = `#!/bin/sh
    echo "Running pre-commit hook"
    if [ -z "$COMMITIZARD_BYPASS" ]; then
      export COMMITIZARD_BYPASS=1
      exec < /dev/tty
      node ./dist/bundle.js --from-hook
    fi`.trim();

    expect(preCommitHookScript.exposedGetScript()).toBe(expectedScript);
  });

  test("should have a script for Windows", () => {
    const expectedScript = `@echo off
    echo Running pre-commit hook
    if not defined COMMITIZARD_BYPASS (
      set COMMITIZARD_BYPASS=1
      node ./dist/bundle.js --from-hook
    )`.trim();

    expect(preCommitHookScript.exposedGetWindowsScript()).toBe(expectedScript);
  });

  test("should install hook if not exists", async () => {
    (gitHookManager.hookExists as jest.Mock).mockResolvedValue(false);
    await preCommitHookScript.install();
    expect(gitHookManager.installHook).toHaveBeenCalled();
  });

  test("should not install hook if already exists", async () => {
    (gitHookManager.hookExists as jest.Mock).mockResolvedValue(true);
    await preCommitHookScript.install();
    expect(gitHookManager.installHook).not.toHaveBeenCalled();
  });

  test("should uninstall hook if exists", async () => {
    (gitHookManager.hookExists as jest.Mock).mockResolvedValue(true);
    await preCommitHookScript.uninstall();
    expect(gitHookManager.uninstallHook).toHaveBeenCalled();
  });

  test("should not uninstall hook if not exists", async () => {
    (gitHookManager.hookExists as jest.Mock).mockResolvedValue(false);
    await preCommitHookScript.uninstall();
    expect(gitHookManager.uninstallHook).not.toHaveBeenCalled();
  });
});
