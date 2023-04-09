import { Command } from "commandzen";
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

  const gitRoot = process.cwd();
  const gitHookManager = new GitHookManager(gitRoot);

  const hooks = [
    {
      name: "pre-commit",
      script: `#!/bin/sh
echo "Running pre-commit hook"
exec < /dev/tty
node ./dist/bundle.js --from-hook
`.trim(),
    },
    {
      name: "prepare-commit-msg",
      script: `#!/bin/sh
commit_msg=$(cat .git/COMMIT_MSG_TMP)
echo "Generated commit message: $commit_msg"
echo "$commit_msg" > $1
rm .git/COMMIT_MSG_TMP
`.trim(),
    },
  ];

  // Install hooks
  const installHooks = async () => {
    for (const hook of hooks) {
      if (await gitHookManager.isHookInstalled(hook.name)) {
        console.warn(
          `Hook '${hook.name}' is already installed, please remove it before installing commit-craft`
        );
        return;
      }
      await gitHookManager.installHook(hook.name, hook.script);
    }
    console.log("Hooks installed");
  };

  // Uninstall hooks
  const uninstallHooks = async () => {
    for (const hook of hooks) {
      if (!(await gitHookManager.isHookInstalled(hook.name))) {
        console.warn(`Hook '${hook.name}' is not installed`);
        return;
      }
      await gitHookManager.uninstallHook(hook.name);
    }
    console.log("Hooks uninstalled");
  };

  // Action function
  const action = async (options: HookCommandOptions) => {
    if (!(await gitManager.isGitRepository())) {
      console.error("This is not a git repository");
      process.exit(1);
    }

    // Install or uninstall hooks based on options
    if (options.install) {
      await installHooks();
    } else if (options.uninstall) {
      await uninstallHooks();
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
