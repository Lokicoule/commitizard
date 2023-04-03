import { Command, Option } from "commandzen";
import * as fs from "fs/promises";
import * as path from "path";
import { pathToFileURL } from "url";
import { GitManagerFactory } from "~/core/git";

export interface HookCommandOptions {
  install: boolean;
  uninstall: boolean;
}

export class HookCommand extends Command<HookCommandOptions> {
  private hookName = "pre-commit";
  private symlinkPath = `.git/hooks/${this.hookName}`;
  private hookPath = path.resolve(process.cwd(), "dist/bundle.js");
  private isWindows = process.platform === "win32";
  private windowsHook = `#!/usr/bin/env node
  import(${JSON.stringify(pathToFileURL(this.hookPath))})
  `.trim();

  private unixHook = `#!/bin/sh
exec < /dev/tty
npx commit-craft wizard
`.trim();

  private gitManager = GitManagerFactory.create({
    exclude: [],
  });

  constructor() {
    super({
      name: "hook",
      description: "Manage the application hooks",
    });
    this.configureAction();
    this.configureOptions();
  }

  private configureOptions(): void {
    this.options = [
      Option.create({
        shortName: "-i",
        longName: "--install",
        description: "Install the hooks",
      }),
      Option.create({
        shortName: "-u",
        longName: "--uninstall",
        description: "Uninstall the hooks",
      }),
    ];
  }

  private configureAction(): void {
    this.action = async (options: HookCommandOptions) => {
      if (!(await this.gitManager.isGitRepository())) {
        console.error("This is not a git repository");
        process.exit(1);
      }

      if (options.install) {
        await this.installHook();
      } else if (options.uninstall) {
        await this.uninstallHook();
      } else {
        console.log("Please specify --install or --uninstall.");
      }
    };
  }

  private async installHook(): Promise<void> {
    try {
      await fs.access(this.symlinkPath);

      const realpath = await fs.realpath(this.symlinkPath).catch(() => {
        console.warn("A different hook seems to be installed");
      });
      console.log(realpath);
      if (realpath === this.hookPath) {
        console.warn("The hook is already installed");
        return;
      }

      throw new Error(
        `A different ${this.hookName} hook seems to be installed. Please remove it before installing.`
      );
    } catch (err: any) {
      if (err.code !== "ENOENT") {
        console.error(err.message);
        process.exit(1);
      }
    }
    try {
      await fs.mkdir(path.dirname(this.symlinkPath), { recursive: true });

      if (this.isWindows) {
        await fs.writeFile(this.symlinkPath, this.windowsHook);
      } else {
        await fs.writeFile(this.symlinkPath, this.unixHook);
        await fs.chmod(this.symlinkPath, 0o755);
      }

      console.log("Hook installed");
    } catch (err: any) {
      console.error(err.message);
      process.exit(1);
    }
  }

  private async uninstallHook(): Promise<void> {
    try {
      await fs.access(this.symlinkPath);
    } catch (err: any) {
      if (err.code === "ENOENT") {
        console.warn("Hook is not installed");
        return;
      }
    }

    if (this.isWindows) {
      const scriptContent = await fs.readFile(this.symlinkPath, "utf8");
      if (scriptContent !== this.windowsHook) {
        console.warn("Hook is not installed");
        return;
      }
    } else {
      const realpath = await fs.realpath(this.symlinkPath);
      if (realpath !== this.hookPath) {
        console.warn("Hook is not installed");
        return;
      }
    }

    await fs.rm(this.symlinkPath);
    console.log("Hook uninstalled");
  }
}
