import {
  existsSync,
  readFileSync,
  renameSync,
  unlinkSync,
  writeFileSync,
} from "fs";
import { defaultConfig } from "../../__config__/default";
import { defaultConfigWithEmojis } from "../../__config__/default-with-emojis";
import { DEFAULT_CONFIG_PATH } from "../../constants";
import { Configuration } from "../../types";
import { ConfigurationService } from "../ConfigurationService";

export class ConfigurationServiceImpl implements ConfigurationService {
  load(configPath?: string, withEmoji = false): Configuration {
    const userConfig = this.read(configPath);

    if (withEmoji) {
      return this.merge(userConfig, defaultConfigWithEmojis);
    }

    return this.merge(userConfig);
  }

  merge(userConfig: Configuration, safeConfig = defaultConfig): Configuration {
    return { ...safeConfig, ...userConfig };
  }

  read(configPath: string = DEFAULT_CONFIG_PATH): Configuration {
    if (configPath === "" || !existsSync(configPath)) {
      return {} as Configuration;
    }

    try {
      const configStr = readFileSync(configPath, { encoding: "utf-8" });
      return JSON.parse(configStr);
    } catch (err: unknown) {
      if (err instanceof Error)
        console.error(
          `Error reading config file ${configPath}: ${err.message}`
        );
      return {} as Configuration;
    }
  }

  write(config: Configuration, configPath: string = DEFAULT_CONFIG_PATH): void {
    try {
      const configStr = JSON.stringify(config, null, 2);
      writeFileSync(configPath, configStr, { encoding: "utf-8" });
    } catch (err: unknown) {
      if (err instanceof Error)
        console.error(
          `Error writing config file ${configPath}: ${err.message}`
        );
    }
  }

  delete(configPath: string = DEFAULT_CONFIG_PATH): void {
    try {
      unlinkSync(configPath);
    } catch (err: unknown) {
      if (err instanceof Error)
        console.error(
          `Error deleting config file ${configPath}: ${err.message}`
        );
    }
  }

  backup(configPath: string = DEFAULT_CONFIG_PATH): void {
    try {
      if (existsSync(configPath)) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const backupPath = `${configPath}.${timestamp}`;
        renameSync(configPath, backupPath);
      }
    } catch (err: unknown) {
      if (err instanceof Error)
        console.error(
          `Error writing config file ${configPath}: ${err.message}`
        );
    }
  }
}
