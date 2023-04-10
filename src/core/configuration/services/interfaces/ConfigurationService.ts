import { Configuration } from "../../types";

export interface ConfigurationService {
  load(configPath?: string, withEmoji?: boolean): Configuration;
  merge(userConfig: Configuration, defaultConfig: Configuration): Configuration;
  read(configPath: string): Configuration;
  write(config: Configuration, configPath: string): void;
  backup(configPath: string): void;
  delete(configPath: string): void;
}
