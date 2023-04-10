import { Configuration } from "../types";
import { ConfigurationManager } from "../managers/interfaces/ConfigurationManager";
import { ConfigurationManagerImpl } from "../managers/impl/ConfigurationManagerImpl";

export class ConfigurationManagerFactory {
  public static create(config: Configuration): ConfigurationManager {
    return new ConfigurationManagerImpl(config);
  }
}
