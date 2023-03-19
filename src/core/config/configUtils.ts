import * as fs from "fs";
import { defaultConfig } from "./defaultConfig";
import { Config } from "./types";

export const DEFAULT_CONFIG_PATH = ".commitcraftrc";

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
    console.error(
      `Error reading config file ${userConfigPath}: ${err.message}`
    );
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
    console.error(
      `Error writing config file ${userConfigPath}: ${err.message}`
    );
  }
}
