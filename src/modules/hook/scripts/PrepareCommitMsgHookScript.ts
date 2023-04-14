import { BaseHookScript } from "./BaseHookScript";
import { COMMIT_MSG_TMP_PATH } from "~/core/git";

export class PrepareCommitMsgHookScript extends BaseHookScript {
  protected getHookName(): string {
    return "prepare-commit-msg";
  }

  protected getScript(): string {
    return `#!/bin/sh
if [ -z "$COMMITIZARD_BYPASS" ]; then
  export COMMITIZARD_BYPASS=1
  (exec < /dev/tty; commitizard --from-hook || true)
  if [ -f "${COMMIT_MSG_TMP_PATH}" ]; then
    commit_msg=$(cat "${COMMIT_MSG_TMP_PATH}")
    echo "Generated commit message: $commit_msg"
    echo "$commit_msg" > "$1"
    rm "${COMMIT_MSG_TMP_PATH}"
  fi
fi`.trim();
  }

  protected getWindowsScript(): string {
    return `@echo off
if not defined COMMITIZARD_BYPASS (
  set COMMITIZARD_BYPASS=1
  start /wait commitizard --from-hook || exit /b
  if exist "${COMMIT_MSG_TMP_PATH}" (
    set /p commit_msg=<"${COMMIT_MSG_TMP_PATH}"
    echo Generated commit message: !commit_msg!
    echo !commit_msg! > "%1"
    del "${COMMIT_MSG_TMP_PATH}"
  )
)`.trim();
  }
}
