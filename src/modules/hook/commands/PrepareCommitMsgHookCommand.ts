import { BaseHookCommand } from "./BaseHookCommand";
import { COMMIT_MSG_TMP_PATH } from "~/core/git";

export class PrepareCommitMsgHookCommand extends BaseHookCommand {
  protected getHookName(): string {
    return "prepare-commit-msg";
  }

  protected getScript(): string {
    return `#!/bin/sh
    if [ -z "$BYPASS_HOOKS" ]; then
      commit_msg=$(cat ${COMMIT_MSG_TMP_PATH})
      echo "Generated commit message: $commit_msg"
      echo "$commit_msg" > $1
      rm .git/COMMIT_MSG_TMP
    fi`.trim();
  }

  protected getWindowsScript(): string {
    return `@echo off
    if not defined BYPASS_HOOKS (
      set /p commit_msg=<${COMMIT_MSG_TMP_PATH}
      echo Generated commit message: %commit_msg%
      echo %commit_msg% > %1
      del .git/COMMIT_MSG_TMP
    )`.trim();
  }
}
