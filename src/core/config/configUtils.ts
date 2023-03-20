import * as fs from "fs";
import { defaultConfig } from "./defaultConfig";
import { Config } from "./types";

export const DEFAULT_CONFIG_PATH = ".commitcraft.json";

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
    const configStr = fs.readFileSync(userConfigPath, {
      encoding: "utf-8",
    });
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
    fs.writeFileSync(userConfigPath, configStr, { encoding: "utf-8" });
    console.log(`Config written to ${userConfigPath}`);
  } catch (err: any) {
    console.error(
      `Error writing config file ${userConfigPath}: ${err.message}`
    );
  }
}

export function deleteUserConfig(
  userConfigPath: string = DEFAULT_CONFIG_PATH
): void {
  try {
    fs.unlinkSync(userConfigPath);
  } catch (err: any) {
    console.error(
      `Error deleting config file ${userConfigPath}: ${err.message}`
    );
  }
}

export function backupUserConfig(
  userConfigPath: string = DEFAULT_CONFIG_PATH
): void {
  try {
    if (fs.existsSync(userConfigPath)) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const backupPath = `${userConfigPath}.${timestamp}`;
      fs.renameSync(userConfigPath, backupPath);
      console.log(`Backup created at ${backupPath}`);
    }
  } catch (err: any) {
    console.error(
      `Error writing config file ${userConfigPath}: ${err.message}`
    );
  }
}
