import { Command } from "commandzen";
import { BaseHookCommand } from "./BaseHookCommand";
import { HookCommandOptions } from "../types/HookCommandOptions";

export class PreCommitHookCommand extends BaseHookCommand {
  public createCommand(): Command {
    const script = `#!/bin/sh
    echo "Running pre-commit hook"
    if [ -z "$BYPASS_HOOKS" ]; then
      export BYPASS_HOOKS=1
      exec < /dev/tty
      node ./dist/bundle.js --from-hook
    fi
    `.trim();

    const windowsScript = `@echo off
    echo Running pre-commit hook
    if not defined BYPASS_HOOKS (
      set BYPASS_HOOKS=1
      node ./dist/bundle.js --from-hook
    )
    `.trim();

    const install = async () => {
      await this.gitHookManager.installHook(
        "pre-commit",
        process.platform === "win32" ? windowsScript : script
      );
    };

    const uninstall = async () => {
      await this.gitHookManager.uninstallHook("pre-commit");
    };

    return Command.create({
      name: "pre-commit",
      description: "Manage the pre-commit hook",
    })
      .addOption({
        flag: "-i, --install",
        description: "Install the pre-commit hook",
      })
      .addOption({
        flag: "-u, --uninstall",
        description: "Uninstall the pre-commit hook",
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
