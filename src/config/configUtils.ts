import * as fs from "fs";
import { CommitType } from "../commit";
import { Logger } from "../logger";

export type CommitOptions = {
  format: string;
  types: CommitType[];
};

export type Config = {
  apiKey: string;
  commitOptions: CommitOptions;
};

export const DEFAULT_CONFIG_PATH = ".commitcraftrc";

const DEFAULT_COMMIT_TYPE_OPTIONS = [
  { value: "feat", label: "feat: A new feature" },
  { value: "fix", label: "fix: A bug fix" },
  { value: "docs", label: "docs: Documentation only changes" },
  {
    value: "style",
    label: "style: Changes that do not affect the meaning of the code",
  },
  {
    value: "refactor",
    label:
      "refactor: A code change that neither fixes a bug nor adds a feature",
  },
  {
    value: "perf",
    label: "perf: A code change that improves performance",
  },
  {
    value: "test",
    label: "test: Adding missing tests or correcting existing tests",
  },
  {
    value: "ci",
    label: "ci: Changes to our CI configuration files and scripts",
  },
  {
    value: "chore",
    label:
      "chore: Changes to the build process or auxiliary tools and libraries",
  },
];

const DEFAULT_COMMIT_OPTIONS: CommitOptions = {
  format: "${type}(${scope}): ${subject}${body}${footer}",
  types: DEFAULT_COMMIT_TYPE_OPTIONS,
};

export const defaultConfig: Config = {
  apiKey: "",
  commitOptions: DEFAULT_COMMIT_OPTIONS,
};

export function loadConfig(userConfigPath?: string): Config {
  const userConfig = readUserConfig(userConfigPath);
  const config = mergeConfig(userConfig);

  return config;
}

export function mergeConfig(userConfig: any): any {
  return { ...defaultConfig, ...userConfig };
}

export function readUserConfig(
  userConfigPath: string = DEFAULT_CONFIG_PATH
): any {
  if (!userConfigPath || !fs.existsSync(userConfigPath)) {
    return {};
  }

  try {
    const configStr = fs.readFileSync(userConfigPath, "utf-8");
    return JSON.parse(configStr);
  } catch (err: any) {
    Logger.error(`Error reading config file ${userConfigPath}: ${err.message}`);
    return {};
  }
}

export function writeUserConfig(
  config: any,
  userConfigPath: string = DEFAULT_CONFIG_PATH
): void {
  try {
    const configStr = JSON.stringify(config, null, 2);
    fs.writeFileSync(userConfigPath, configStr, "utf-8");
  } catch (err: any) {
    Logger.error(`Error writing config file ${userConfigPath}: ${err.message}`);
  }
}
