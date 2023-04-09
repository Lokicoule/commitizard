import { Command } from "commandzen";
import { promises as fs } from "fs";
import { join } from "path";
import { GitManagerFactory } from "~/core/git";
import { GitHookManager } from "~/core/git/manager/GitHookManager";

export interface HookCommandOptions {
  install: boolean;
  uninstall: boolean;
}

export const hookCommandFactory = () => {
  const gitManager = GitManagerFactory.create({
    exclude: [],
  });

  const gitRoot = process.cwd(); // or use the path to your Git repository root
  const gitHookManager = new GitHookManager(gitRoot);

  const hookName = "prepare-commit-msg";
  const prepareCommitMsgHook = `#!/bin/sh
commit_msg=$(cat .git/COMMIT_MSG_TMP)
echo "Generated commit message: $commit_msg"
echo "$commit_msg" > $1
rm .git/COMMIT_MSG_TMP
`.trim();

  const preCommitHookName = "pre-commit";
  const preCommitHook = `#!/bin/sh
echo "Running pre-commit hook"
exec < /dev/tty
node ./dist/bundle.js
`.trim();

  const installHook = async () => {
    if (await gitHookManager.isHookInstalled(hookName)) {
      console.warn("The hook is already installed");
      return;
    }
    await gitHookManager.installHook(preCommitHookName, preCommitHook);
    await gitHookManager.installHook(hookName, prepareCommitMsgHook);
    console.log("Hook installed");
  };

  const uninstallHook = async () => {
    if (!(await gitHookManager.isHookInstalled(hookName))) {
      console.warn("Hook is not installed");
      return;
    }

    await gitHookManager.uninstallHook(hookName);
    console.log("Hook uninstalled");
  };

  const action = async (options: HookCommandOptions) => {
    if (!(await gitManager.isGitRepository())) {
      console.error("This is not a git repository");
      process.exit(1);
    }

    if (options.install) {
      await installHook();
    } else if (options.uninstall) {
      await uninstallHook();
    } else {
      console.log("Please specify --install or --uninstall.");
    }
  };

  return Command.create({
    name: "hook",
    description: "Manage the application hooks",
  })
    .addOption({
      flag: "-i, --install",
      description: "Install the hooks",
    })
    .addOption({
      flag: "-u, --uninstall",
      description: "Uninstall the hooks",
    })
    .registerAction(action);
};
