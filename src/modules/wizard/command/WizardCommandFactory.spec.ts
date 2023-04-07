import { Command } from "commandzen";
import {
  ConfigurationManagerFactory,
  ConfigurationService,
  ConfigurationServiceFactory,
  DEFAULT_CONFIG_PATH,
} from "~/core/configuration";
import { GitManagerFactory } from "~/core/git";
import { PromptManagerFactory } from "~/core/prompt/manager/PromptManagerFactory";
import { CommitConventionStrategyType } from "~/modules/commit/strategy/CommitConventionStrategy";
import { ConventionalStrategy } from "~/modules/conventional/strategy/ConventionalStrategy";
import { RedGreenRefactorStrategy } from "~/modules/red-green-refactor/strategy/RedGreenRefactorStrategy";
import { WizardCommitHandlerChainBuilder } from "../handlers/WizardCommitHandlerBuilder";
import { wizardCommandFactory } from "./wizardCommandFactory";

jest.mock("~/core/configuration/service/ConfigurationServiceFactory");
jest.mock("~/core/configuration/manager/ConfigurationManagerFactory");
jest.mock("~/core/git/manager/GitManagerFactory");
jest.mock("~/core/prompt/manager/PromptManagerFactory");
jest.mock("~/modules/conventional/strategy/ConventionalStrategy");
jest.mock("~/modules/red-green-refactor/strategy/RedGreenRefactorStrategy");
jest.mock("~/modules/wizard/handlers/WizardCommitHandlerBuilder");

describe("WizardCommand", () => {
  let configurationService: ConfigurationService;

  beforeEach(() => {
    configurationService = {
      load: jest.fn(),
    } as unknown as ConfigurationService;

    (ConfigurationServiceFactory.create as jest.Mock).mockReturnValue(
      configurationService
    );
    (ConfigurationManagerFactory.create as jest.Mock).mockReturnValue({
      getExcludePaths: jest.fn().mockReturnValue([]),
    });
    (GitManagerFactory.create as jest.Mock).mockReturnValue({});
    (PromptManagerFactory.create as jest.Mock).mockReturnValue({});
    (ConventionalStrategy as jest.Mock).mockImplementation(() => {});
    (RedGreenRefactorStrategy as jest.Mock).mockImplementation(() => {});
    (WizardCommitHandlerChainBuilder as jest.Mock).mockImplementation(() => {
      return {
        withDisplayStagedFilesHandler: jest.fn().mockReturnThis(),
        withCommitFileSelectionHandler: jest.fn().mockReturnThis(),
        withCommitMessageGeneratorHandler: jest.fn().mockReturnThis(),
        withCommitConfirmationHandler: jest.fn().mockReturnThis(),
        withCommitRunnerHandler: jest.fn().mockReturnThis(),
        buildAndExecute: jest.fn().mockResolvedValue(undefined),
      };
    });
  });

  it("should create a WizardCommand instance", () => {
    const wizardCommand = wizardCommandFactory(configurationService);

    expect(wizardCommand).toBeInstanceOf(Command);
  });

  it("should execute WizardCommand action", () => {
    const wizardCommand = wizardCommandFactory(configurationService);

    wizardCommand.emit("wizard", {
      path: DEFAULT_CONFIG_PATH,
      displayStagedFiles: false,
      selectFiles: false,
      strategy: CommitConventionStrategyType.CONVENTIONAL,
      withEmoji: false,
    });

    expect(ConfigurationManagerFactory.create).toHaveBeenCalled();
    expect(GitManagerFactory.create).toHaveBeenCalled();
    expect(PromptManagerFactory.create).toHaveBeenCalled();
    expect(WizardCommitHandlerChainBuilder).toHaveBeenCalled();
  });
});
