import { FilesystemAdapter } from "~/adapters/filesystem";
import { ConfigurationService } from "../ConfigurationService";
import { DEFAULT_CONFIG_PATH } from "../../constants";
import { defaultConfig } from "../../__config__/default";
import { Configuration } from "../../types";

export class ConfigurationServiceImpl implements ConfigurationService {
  private readonly filesystemAdapter: FilesystemAdapter;

  constructor(filesystemAdapter: FilesystemAdapter) {
    this.filesystemAdapter = filesystemAdapter;
  }

  load(configPath?: string): Configuration {
    const userConfig = this.read(configPath);
    const config = this.merge(userConfig);

    return config;
  }

  merge(userConfig: Configuration): Configuration {
    return { ...defaultConfig, ...userConfig };
  }

  read(configPath: string = DEFAULT_CONFIG_PATH): Configuration {
    if (!configPath || !this.filesystemAdapter.exists(configPath)) {
      return {} as Configuration;
    }

    try {
      const configStr = this.filesystemAdapter.read(configPath);
      return JSON.parse(configStr);
    } catch (err: any) {
      console.error(`Error reading config file ${configPath}: ${err.message}`);
      return {} as Configuration;
    }
  }

  write(config: Configuration, configPath: string = DEFAULT_CONFIG_PATH): void {
    try {
      const configStr = JSON.stringify(config, null, 2);
      this.filesystemAdapter.write(configPath, configStr);
      console.log(`Config written to ${configPath}`);
    } catch (err: any) {
      console.error(`Error writing config file ${configPath}: ${err.message}`);
    }
  }

  delete(configPath: string = DEFAULT_CONFIG_PATH): void {
    try {
      this.filesystemAdapter.delete(configPath);
    } catch (err: any) {
      console.error(`Error deleting config file ${configPath}: ${err.message}`);
    }
  }

  backup(configPath: string = DEFAULT_CONFIG_PATH): void {
    try {
      if (this.filesystemAdapter.exists(configPath)) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const backupPath = `${configPath}.${timestamp}`;
        this.filesystemAdapter.rename(configPath, backupPath);
        console.log(`Backup created at ${backupPath}`);
      }
    } catch (err: any) {
      console.error(`Error writing config file ${configPath}: ${err.message}`);
    }
  }
}
