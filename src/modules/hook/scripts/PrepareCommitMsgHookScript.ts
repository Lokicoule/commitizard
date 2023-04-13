import { BaseHookScript } from "./BaseHookScript";
import { COMMIT_MSG_TMP_PATH } from "~/core/git";

export class PrepareCommitMsgHookScript extends BaseHookScript {
  protected getHookName(): string {
    return "prepare-commit-msg";
  }

  protected getScript(): string {
    return `#!/bin/sh
    if [ -z "$COMMITIZARD_BYPASS" ]; then
      commit_msg=$(cat ${COMMIT_MSG_TMP_PATH})
      echo "Generated commit message: $commit_msg"
      echo "$commit_msg" > $1
      rm .git/COMMIT_MSG_TMP
    fi`.trim();
  }

  protected getWindowsScript(): string {
    return `@echo off
    if not defined COMMITIZARD_BYPASS (
      set /p commit_msg=<${COMMIT_MSG_TMP_PATH}
      echo Generated commit message: %commit_msg%
      echo %commit_msg% > %1
      del .git/COMMIT_MSG_TMP
    )`.trim();
  }
}
