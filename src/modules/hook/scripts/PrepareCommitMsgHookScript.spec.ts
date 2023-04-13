import { GitHookManager } from "~/core/git";
import { COMMIT_MSG_TMP_PATH } from "~/core/git";
import { PrepareCommitMsgHookScript } from "./PrepareCommitMsgHookScript";

class TestPrepareCommitMsgHookScript extends PrepareCommitMsgHookScript {
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

describe("PrepareCommitMsgHookScript", () => {
  let gitHookManager: GitHookManager;
  let prepareCommitMsgHookScript: TestPrepareCommitMsgHookScript;

  beforeEach(() => {
    gitHookManager = {
      hookExists: jest.fn(),
      installHook: jest.fn(),
      uninstallHook: jest.fn(),
    } as unknown as GitHookManager;

    prepareCommitMsgHookScript = new TestPrepareCommitMsgHookScript(
      gitHookManager
    );
  });

  test("should have a hook name", () => {
    expect(prepareCommitMsgHookScript.exposedGetHookName()).toBe(
      "prepare-commit-msg"
    );
  });

  test("should have a script for Unix-based systems", () => {
    const expectedScript = `#!/bin/sh
    if [ -z "$COMMITIZARD_BYPASS" ]; then
      commit_msg=$(cat ${COMMIT_MSG_TMP_PATH})
      echo "Generated commit message: $commit_msg"
      echo "$commit_msg" > $1
      rm .git/COMMIT_MSG_TMP
    fi`.trim();

    expect(prepareCommitMsgHookScript.exposedGetScript()).toBe(expectedScript);
  });

  test("should have a script for Windows", () => {
    const expectedScript = `@echo off
    if not defined COMMITIZARD_BYPASS (
      set /p commit_msg=<${COMMIT_MSG_TMP_PATH}
      echo Generated commit message: %commit_msg%
      echo %commit_msg% > %1
      del .git/COMMIT_MSG_TMP
    )`.trim();

    expect(prepareCommitMsgHookScript.exposedGetWindowsScript()).toBe(
      expectedScript
    );
  });

  test("should install hook if not exists", async () => {
    (gitHookManager.hookExists as jest.Mock).mockResolvedValue(false);
    await prepareCommitMsgHookScript.install();
    expect(gitHookManager.installHook).toHaveBeenCalled();
  });

  test("should not install hook if already exists", async () => {
    (gitHookManager.hookExists as jest.Mock).mockResolvedValue(true);
    await prepareCommitMsgHookScript.install();
    expect(gitHookManager.installHook).not.toHaveBeenCalled();
  });

  test("should uninstall hook if exists", async () => {
    (gitHookManager.hookExists as jest.Mock).mockResolvedValue(true);
    await prepareCommitMsgHookScript.uninstall();
    expect(gitHookManager.uninstallHook).toHaveBeenCalled();
  });

  test("should not uninstall hook if not exists", async () => {
    (gitHookManager.hookExists as jest.Mock).mockResolvedValue(false);
    await prepareCommitMsgHookScript.uninstall();
    expect(gitHookManager.uninstallHook).not.toHaveBeenCalled();
  });
});
