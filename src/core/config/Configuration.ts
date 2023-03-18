import { Config, loadConfig } from "./configUtils";

export class Configuration {
  private static instance: Configuration;
  private static config: Config;

  private constructor() {}

  public static getInstance(): Configuration {
    if (!Configuration.instance) {
      Configuration.instance = new Configuration();
    }

    return Configuration.instance;
  }

  public static initialize(userConfigPath?: string): void {
    const config = loadConfig(userConfigPath);
    Configuration.setConfig(config);
  }

  public static getConfig(): Config {
    return this.config;
  }

  private static setConfig(config: Config): void {
    this.config = config;
  }
}
