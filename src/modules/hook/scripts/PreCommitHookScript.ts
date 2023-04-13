import { BaseHookScript } from "./BaseHookScript";

export class PreCommitHookScript extends BaseHookScript {
  protected getHookName(): string {
    return "pre-commit";
  }

  protected getScript(): string {
    return `#!/bin/sh
    echo "Running pre-commit hook"
    if [ -z "$COMMITIZARD_BYPASS" ]; then
      export COMMITIZARD_BYPASS=1
      exec < /dev/tty
      node ./dist/bundle.js --from-hook
    fi`.trim();
  }

  protected getWindowsScript(): string {
    return `@echo off
    echo Running pre-commit hook
    if not defined COMMITIZARD_BYPASS (
      set COMMITIZARD_BYPASS=1
      node ./dist/bundle.js --from-hook
    )`.trim();
  }
}
