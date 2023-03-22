import { ConfigurationValidator } from "./ConfigurationValidator";
import { ConfigurationValidatorImpl } from "./impl/ConfigurationValidatorImpl";

export class ConfigurationValidatorFactory {
  public create(): ConfigurationValidator {
    return new ConfigurationValidatorImpl();
  }
}
