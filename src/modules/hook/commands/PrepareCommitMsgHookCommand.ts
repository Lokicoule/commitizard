import { Command } from "commandzen";
import { COMMIT_MSG_TMP_PATH } from "~/core/git";
import { BaseHookCommand } from "./BaseHookCommand";
import { HookCommandOptions } from "../types/HookCommandOptions";

export class PrepareCommitMsgHookCommand extends BaseHookCommand {
  public createCommand(): Command {
    const script = `#!/bin/sh
    if [ -z "$BYPASS_HOOKS" ]; then
      commit_msg=$(cat ${COMMIT_MSG_TMP_PATH})
      echo "Generated commit message: $commit_msg"
      echo "$commit_msg" > $1
      rm .git/COMMIT_MSG_TMP
    fi
    `.trim();

    const windowsScript = `@echo off
    if not defined BYPASS_HOOKS (
      set /p commit_msg=<${COMMIT_MSG_TMP_PATH}
      echo Generated commit message: %commit_msg%
      echo %commit_msg% > %1
      del .git/COMMIT_MSG_TMP
    )
    `.trim();

    const install = async () => {
      await this.gitHookManager.installHook(
        "prepare-commit-msg",
        process.platform === "win32" ? windowsScript : script
      );
    };

    const uninstall = async () => {
      await this.gitHookManager.uninstallHook("prepare-commit-msg");
    };

    return Command.create({
      name: "prepare-commit-msg",
      description: "Manage the prepare-commit-msg hook",
    })
      .addOption({
        flag: "-i, --install",
        description: "Install the prepare-commit-msg hook",
      })
      .addOption({
        flag: "-u, --uninstall",
        description: "Uninstall the prepare-commit-msg hook",
      })
      .registerAction(async (options: HookCommandOptions) => {
        if (options.install) {
          await install();
        } else if (options.uninstall) {
          await uninstall();
        } else {
          console.log("Please specify --install or --uninstall.");
        }
      });
  }
}
