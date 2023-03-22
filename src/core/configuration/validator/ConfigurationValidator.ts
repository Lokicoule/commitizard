import { Configuration } from "../types";

export interface ConfigurationValidator {
  validate(config: Configuration): void;
}
