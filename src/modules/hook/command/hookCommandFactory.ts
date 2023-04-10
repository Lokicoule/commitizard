import { Command } from "commandzen";
import { GitHookManagerFactory, GitManagerFactory } from "~/core/git";
import { COMMIT_MSG_TMP_PATH } from "~/core/git/constants";

export interface HookCommandOptions {
  install: boolean;
  uninstall: boolean;
}

export const hookCommandFactory = () => {
  const gitManager = GitManagerFactory.create({
    exclude: [],
  });

  const gitHookManager = GitHookManagerFactory.create();

  const hooks = [
    {
      name: "pre-commit",
      script: `#!/bin/sh
  echo "Running pre-commit hook"
  if [ -z "$BYPASS_HOOKS" ]; then
    export BYPASS_HOOKS=1
    exec < /dev/tty
    node ./dist/bundle.js --from-hook
  fi
  `.trim(),
      windowsScript: `@echo off
  echo Running pre-commit hook
  if not defined BYPASS_HOOKS (
    set BYPASS_HOOKS=1
    node ./dist/bundle.js --from-hook
  )
  `.trim(),
    },
    {
      name: "prepare-commit-msg",
      script: `#!/bin/sh
  if [ -z "$BYPASS_HOOKS" ]; then
    commit_msg=$(cat ${COMMIT_MSG_TMP_PATH})
    echo "Generated commit message: $commit_msg"
    echo "$commit_msg" > $1
    rm .git/COMMIT_MSG_TMP
  fi
  `.trim(),
      windowsScript: `@echo off
  if not defined BYPASS_HOOKS (
    set /p commit_msg=<${COMMIT_MSG_TMP_PATH}
    echo Generated commit message: %commit_msg%
    echo %commit_msg% > %1
    del .git/COMMIT_MSG_TMP
  )
  `.trim(),
    },
  ];

  // Install hooks
  const installHooks = async () => {
    const installPromises = hooks.map(async (hook) => {
      if (await gitHookManager.isHookInstalled(hook.name)) {
        console.warn(
          `Hook '${hook.name}' is already installed, please remove it before installing commit-craft`
        );
        return;
      }

      const script =
        process.platform === "win32" ? hook.windowsScript : hook.script;
      await gitHookManager.installHook(hook.name, script);
    });

    await Promise.all(installPromises);
    console.info("Hooks installed");
  };

  // Uninstall hooks
  const uninstallHooks = async () => {
    const uninstallPromises = hooks.map(async (hook) => {
      if (!(await gitHookManager.isHookInstalled(hook.name))) {
        console.warn(`Hook '${hook.name}' is not installed`);
        return;
      }
      await gitHookManager.uninstallHook(hook.name);
    });

    await Promise.all(uninstallPromises);
    console.info("Hooks uninstalled");
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
