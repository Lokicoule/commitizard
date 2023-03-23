import {
  CliOptions,
  ConventionalCommitTemplate,
  RedGreenRefactorCliOptionsType,
  RedGreenRefactorCommitTemplate,
} from "../types";

export interface ConfigurationManager {
  getVersion(): string;
  getWizardMaxViewFilesToShow(): number;
  getConventionalCommitTemplate(): ConventionalCommitTemplate;
  getConventionalCommitTemplateOrder(): string[];
  getConventionalCliOptionsTypes(): CliOptions[];
  getConventionalCliOptionsScopes(): CliOptions[];
  getRedGreenRefactorCommitTemplate(): RedGreenRefactorCommitTemplate;
  getRedGreenRefactorCommitTemplateOrder(): string[];
  getRedGreenRefactorCliOptionsTypes(): RedGreenRefactorCliOptionsType[];
  selectorRedGreenRefactorCliOptionsTypes(
    selector: string
  ): RedGreenRefactorCliOptionsType | undefined;
  getExcludePaths(): string[];
}
