import { ConfigurationManager } from "../ConfigurationManager";
import {
  Configuration,
  CliOptions,
  ConventionalCommitTemplate,
  RedGreenRefactorCliOptionsType,
  RedGreenRefactorCommitTemplate,
} from "../../types";
import { MAX_FILES_TO_SHOW } from "../../constants";

export class ConfigurationManagerImpl implements ConfigurationManager {
  private readonly config: Configuration;

  constructor(config: Configuration) {
    this.config = config;
  }

  public getVersion(): string {
    return this.config.version;
  }

  public getWizardMaxViewFilesToShow(): number {
    return this.config.settings.maxViewFilesToShow ?? MAX_FILES_TO_SHOW;
  }

  public getConventionalCommitTemplate(): ConventionalCommitTemplate {
    return this.config.conventional.commitOptions.template;
  }

  public getConventionalCommitTemplateOrder(): string[] {
    return this.config.conventional.commitOptions.templateOrder ?? [];
  }

  public getConventionalCliOptionsTypes(): CliOptions[] {
    return this.config.conventional.cliOptions.types ?? [];
  }

  public getConventionalCliOptionsScopes(): CliOptions[] {
    return this.config.conventional.cliOptions.scopes ?? [];
  }

  public getRedGreenRefactorCommitTemplate(): RedGreenRefactorCommitTemplate {
    return this.config.redGreenRefactor.commitOptions.template;
  }

  public getRedGreenRefactorCommitTemplateOrder(): string[] {
    return this.config.redGreenRefactor.commitOptions.templateOrder ?? [];
  }

  public getRedGreenRefactorCliOptionsTypes(): RedGreenRefactorCliOptionsType[] {
    return this.config.redGreenRefactor.cliOptions.types ?? [];
  }

  public selectorRedGreenRefactorCliOptionsTypes(
    selector: string
  ): RedGreenRefactorCliOptionsType | undefined {
    return this.config.redGreenRefactor.cliOptions.types.find(
      (type) => type.value === selector
    );
  }
}
