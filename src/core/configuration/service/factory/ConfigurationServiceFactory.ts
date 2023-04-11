import { ConfigurationService } from "..";
import { ConfigurationServiceImpl } from "../impl/ConfigurationServiceImpl";

export class ConfigurationServiceFactory {
  public static create(): ConfigurationService {
    return new ConfigurationServiceImpl();
  }
}
