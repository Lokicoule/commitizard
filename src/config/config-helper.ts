import * as fs from "fs";
import { CommitType } from "~/commit";

export interface Config {
  apiKey: string;
  commitTypes: CommitType[];
}

const COMMIT_TYPE_OPTIONS = [
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
    value: "chore",
    label:
      "chore: Changes to the build process or auxiliary tools and libraries",
  },
];

const defaultConfig: Config = {
  apiKey: "",
  commitTypes: COMMIT_TYPE_OPTIONS,
};

export function loadConfig(userConfigPath?: string): Config {
  const userConfig = readUserConfig(userConfigPath);
  const config = mergeConfig(userConfig);

  return config;
}

export function mergeConfig(userConfig: any): any {
  return { ...defaultConfig, ...userConfig };
}

export function readUserConfig(userConfigPath?: string): any {
  if (!userConfigPath || !fs.existsSync(userConfigPath)) {
    return {};
  }

  try {
    const configStr = fs.readFileSync(userConfigPath, "utf-8");
    return JSON.parse(configStr);
  } catch (err: any) {
    console.error(
      `Error reading config file ${userConfigPath}: ${err.message}`
    );
    return {};
  }
}
