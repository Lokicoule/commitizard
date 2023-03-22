import { Configuration } from "../types";
import { ConfigurationManager } from "./ConfigurationManager";
import { ConfigurationManagerImpl } from "./impl/ConfigurationManagerImpl";

export class ConfigurationManagerFactory {
  public static create(config: Configuration): ConfigurationManager {
    return new ConfigurationManagerImpl(config);
  }
}
