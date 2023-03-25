import { ConfigurationValidator } from "../ConfigurationValidator";
import { Configuration } from "../../types";

export class ConfigurationValidatorImpl implements ConfigurationValidator {
  public validate(config: Configuration): void {
    if (config.version === "") {
      throw new Error("Configuration version is not defined");
    }

    if (Number.isNaN(config.settings.maxViewFilesToShow)) {
      throw new Error(
        "Configuration settings maxViewFilesToShow is not a number"
      );
    }

    if (config.conventional.commitOptions.templateOrder.length === 0) {
      throw new Error(
        "Configuration conventional commitOptions templateOrder is empty"
      );
    }

    if (config.conventional.cliOptions.types.length === 0) {
      throw new Error("Configuration conventional cliOptions types is empty");
    }

    if (config.redGreenRefactor.commitOptions.templateOrder.length === 0) {
      throw new Error(
        "Configuration redGreenRefactor commitOptions templateOrder is empty"
      );
    }

    if (config.redGreenRefactor.cliOptions.types.length === 0) {
      throw new Error(
        "Configuration redGreenRefactor cliOptions types is empty"
      );
    }
  }
}
