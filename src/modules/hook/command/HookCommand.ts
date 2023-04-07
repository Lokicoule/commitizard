import { Command } from "commandzen";
import * as fs from "fs/promises";
import * as path from "path";
import { pathToFileURL } from "url";
import { GitManagerFactory } from "~/core/git";

export interface HookCommandOptions {
  install: boolean;
  uninstall: boolean;
}

export const hookCommandFactory = () => {
  const hookName = "prepare-commit-msg";
  const symlinkPath = `.git/hooks/${hookName}`;
  const hookPath = path.resolve(process.cwd(), "dist/bundle.js");
  const isWindows = process.platform === "win32";
  const windowsHook = `#!/usr/bin/env node
import(${JSON.stringify(pathToFileURL(hookPath))})
`.trim();

  const unixHook = `#!/bin/sh
exec < /dev/tty
npx commit-craft wizard
`.trim();
  const preCommitHook = `#!/bin/sh
exec < /dev/tty
npx commit-craft wizard
`.trim();

  const gitManager = GitManagerFactory.create({
    exclude: [],
  });

  const installHook = async () => {
    try {
      await fs.access(symlinkPath);

      const realpath = await fs.realpath(symlinkPath).catch(() => {
        console.warn("A different hook seems to be installed");
      });
      console.log(realpath);
      if (realpath === hookPath) {
        console.warn("The hook is already installed");
        return;
      }

      throw new Error(
        `A different ${hookName} hook seems to be installed. Please remove it before installing.`
      );
    } catch (err: any) {
      if (err.code !== "ENOENT") {
        console.error(err.message);
        process.exit(1);
      }
    }
    try {
      await fs.mkdir(path.dirname(symlinkPath), { recursive: true });

      if (isWindows) {
        await fs.writeFile(symlinkPath, windowsHook);
      } else {
        // Install pre-commit hook
        const preCommitSymlinkPath = `.git/hooks/pre-commit`;
        await fs.writeFile(preCommitSymlinkPath, preCommitHook);
        await fs.chmod(preCommitSymlinkPath, 0o755);
      }

      console.log("Hook installed");
    } catch (err: any) {
      console.error(err.message);
      process.exit(1);
    }
  };

  const uninstallHook = async () => {
    try {
      await fs.access(symlinkPath);
    } catch (err: any) {
      if (err.code === "ENOENT") {
        console.warn("Hook is not installed");
        return;
      }
    }

    if (isWindows) {
      const scriptContent = await fs.readFile(symlinkPath, "utf8");
      if (scriptContent !== windowsHook) {
        console.warn("Hook is not installed");
        return;
      }
    } else {
      // Uninstall pre-commit hook
      const preCommitSymlinkPath = `.git/hooks/pre-commit`;
      await fs.rm(preCommitSymlinkPath);

      // Uninstall prepare-commit-msg hook
      const prepareCommitMsgSymlinkPath = `.git/hooks/prepare-commit-msg`;
      await fs.rm(prepareCommitMsgSymlinkPath);
      /* if (realpath !== hookPath) {
        console.warn("Hook is not installed");
        return;
      } */
    }

    /*     await fs.rm(symlinkPath);
     */ console.log("Hook uninstalled");
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
