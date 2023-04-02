import { ConfigurationService } from "~/core/configuration";
import { ConfigurationManagerFactory } from "~/core/configuration";
import { GitManagerFactory } from "~/core/git";
import { PromptManagerFactory } from "~/core/prompt/manager/PromptManagerFactory";
import { ParsedOptions } from "commandzen";
import { CommitConventionStrategyType } from "~/modules/commit/strategy/CommitConventionStrategy";
import { WizardCommand } from "./WizardCommand";
import { WizardCommitHandlerFactory } from "../handlers/WizardCommitHandlerFactory";
import { WizardCommitHandlerChainBuilder } from "../handlers/WizardCommitHandlerBuilder";

jest.mock("~/core/configuration/manager/ConfigurationManagerFactory");
jest.mock("~/core/git/manager/GitManagerFactory");
jest.mock("~/core/prompt/manager/PromptManagerFactory");
jest.mock("~/modules/wizard/handlers/WizardCommitHandlerBuilder");
jest.mock("~/modules/wizard/handlers/WizardCommitHandlerFactory");

describe("WizardCommand", () => {
  let configurationService: ConfigurationService;
  let parsedOptions: ParsedOptions;

  beforeEach(() => {
    configurationService = {
      load: jest.fn(),
    } as unknown as ConfigurationService;

    parsedOptions = {
      config: "",
      "display-staged-files": false,
      "select-files": false,
      strategy: CommitConventionStrategyType.CONVENTIONAL,
      "with-emoji": false,
    };

    (ConfigurationManagerFactory.create as jest.Mock).mockReturnValue({
      getExcludePaths: jest.fn().mockReturnValue([]),
    });
    (GitManagerFactory.create as jest.Mock).mockReturnValue({});
    (PromptManagerFactory.create as jest.Mock).mockReturnValue({});
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
    (WizardCommitHandlerFactory as jest.Mock).mockImplementation(() => {
      return {};
    });
  });

  it("should create a WizardCommand instance", () => {
    const wizardCommand = new WizardCommand(configurationService);

    expect(wizardCommand).toBeInstanceOf(WizardCommand);
  });

  it("should execute WizardCommand action", async () => {
    const wizardCommand = new WizardCommand(configurationService);
    wizardCommand.execute(parsedOptions);

    expect(ConfigurationManagerFactory.create).toHaveBeenCalled();
    expect(GitManagerFactory.create).toHaveBeenCalled();
    expect(PromptManagerFactory.create).toHaveBeenCalled();
    expect(WizardCommitHandlerChainBuilder).toHaveBeenCalled();
  });
});
