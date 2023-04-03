import { MAX_FILES_TO_SHOW } from "../../constants";
import {
  Configuration,
  ConventionalCommitTemplate,
  RedGreenRefactorCommitTemplate,
} from "../../types";
import { ConfigurationManagerImpl } from "./ConfigurationManagerImpl";

describe("ConfigurationManagerImpl", () => {
  let config: Configuration;
  let configurationManager: ConfigurationManagerImpl;

  beforeEach(() => {
    config = {
      version: "1.0.0",
      settings: {
        maxViewFilesToShow: 10,
        excludePaths: ["test1", "test2"],
      },
      conventional: {
        commitOptions: {
          template: {} as ConventionalCommitTemplate,
          templateOrder: ["type", "scope", "subject"],
        },
        cliOptions: {
          types: [
            { value: "feat", label: "Feature" },
            { value: "fix", label: "Bugfix" },
          ],
          scopes: [
            { value: "scope1", label: "Scope 1" },
            { value: "scope2", label: "Scope 2" },
          ],
        },
      },
      redGreenRefactor: {
        commitOptions: {
          template: {} as RedGreenRefactorCommitTemplate,
          templateOrder: ["selector", "subject"],
        },
        cliOptions: {
          types: [
            {
              value: "red",
              label: "Red",
              patterns: ["red"],
            },
            {
              value: "green",
              label: "Green",
              patterns: ["green"],
            },
            {
              value: "refactor",
              label: "Refactor",
              patterns: ["refactor"],
            },
          ],
        },
      },
    };
    configurationManager = new ConfigurationManagerImpl(config);
  });

  it("should get version", () => {
    expect(configurationManager.getVersion()).toBe("1.0.0");
  });

  it("should get wizard max view files to show", () => {
    expect(configurationManager.getWizardMaxViewFilesToShow()).toBe(10);
  });

  it("should get conventional commit template", () => {
    expect(configurationManager.getConventionalCommitTemplate()).toEqual({});
  });

  it("should get conventional commit template order", () => {
    expect(configurationManager.getConventionalCommitTemplateOrder()).toEqual([
      "type",
      "scope",
      "subject",
    ]);
  });

  it("should get conventional cli options types", () => {
    expect(configurationManager.getConventionalCliOptionsTypes()).toEqual([
      { value: "feat", label: "Feature" },
      { value: "fix", label: "Bugfix" },
    ]);
  });

  it("should get conventional cli options scopes", () => {
    expect(configurationManager.getConventionalCliOptionsScopes()).toEqual([
      { value: "scope1", label: "Scope 1" },
      { value: "scope2", label: "Scope 2" },
    ]);
  });

  it("should get red green refactor commit template", () => {
    expect(configurationManager.getRedGreenRefactorCommitTemplate()).toEqual(
      {}
    );
  });

  it("should get red green refactor commit template order", () => {
    expect(
      configurationManager.getRedGreenRefactorCommitTemplateOrder()
    ).toEqual(["selector", "subject"]);
  });

  it("should get red green refactor cli options types", () => {
    expect(configurationManager.getRedGreenRefactorCliOptionsTypes()).toEqual([
      {
        value: "red",
        label: "Red",
        patterns: ["red"],
      },
      {
        value: "green",
        label: "Green",
        patterns: ["green"],
      },
      {
        value: "refactor",
        label: "Refactor",
        patterns: ["refactor"],
      },
    ]);
  });

  it("should get exclude paths", () => {
    expect(configurationManager.getExcludePaths()).toEqual(["test1", "test2"]);
  });

  it("should selector red green refactor cli options types", () => {
    const selectedType =
      configurationManager.selectorRedGreenRefactorCliOptionsTypes("red");
    expect(selectedType).toEqual({
      value: "red",
      label: "Red",
      patterns: ["red"],
    });

    const nonExistentType =
      configurationManager.selectorRedGreenRefactorCliOptionsTypes(
        "non-existent"
      );
    expect(nonExistentType).toBeUndefined();
  });

  it("should return default value if maxViewFilesToShow is not set", () => {
    const configWithoutMaxViewFilesToShow: Configuration = {
      version: "1.0.0",
      settings: {},
      conventional: {
        commitOptions: {} as ConventionalCommitTemplate,
        cliOptions: {},
      },
      redGreenRefactor: {
        commitOptions: {} as RedGreenRefactorCommitTemplate,
        cliOptions: {},
      },
    } as unknown as Configuration;
    const configurationManagerWithoutMaxViewFilesToShow =
      new ConfigurationManagerImpl(configWithoutMaxViewFilesToShow);

    expect(
      configurationManagerWithoutMaxViewFilesToShow.getWizardMaxViewFilesToShow()
    ).toBe(MAX_FILES_TO_SHOW);
  });

  it("should return default value if conventional commit template is not set", () => {
    const configWithoutConventionalCommitTemplate: Configuration = {
      version: "1.0.0",
      settings: {},
      conventional: {
        commitOptions: {} as ConventionalCommitTemplate,
        cliOptions: {},
      },
      redGreenRefactor: {
        commitOptions: {} as RedGreenRefactorCommitTemplate,
        cliOptions: {},
      },
    } as unknown as Configuration;
    const configurationManagerWithoutConventionalCommitTemplate =
      new ConfigurationManagerImpl(configWithoutConventionalCommitTemplate);

    expect(
      configurationManagerWithoutConventionalCommitTemplate.getConventionalCommitTemplate()
    ).toBeUndefined();
  });

  it("should return default value if conventional commit template order is not set", () => {
    const configWithoutConventionalCommitTemplateOrder: Configuration = {
      version: "1.0.0",
      settings: {},
      conventional: {
        commitOptions: {} as ConventionalCommitTemplate,
        cliOptions: {},
      },
      redGreenRefactor: {
        commitOptions: {} as RedGreenRefactorCommitTemplate,
        cliOptions: {},
      },
    } as unknown as Configuration;
    const configurationManagerWithoutConventionalCommitTemplateOrder =
      new ConfigurationManagerImpl(
        configWithoutConventionalCommitTemplateOrder
      );

    expect(
      configurationManagerWithoutConventionalCommitTemplateOrder.getConventionalCommitTemplateOrder()
    ).toEqual([]);
  });

  it("should return default value if conventional cli options types is not set", () => {
    const configWithoutConventionalCliOptionsTypes: Configuration = {
      version: "1.0.0",
      settings: {},
      conventional: {
        commitOptions: {} as ConventionalCommitTemplate,
        cliOptions: {},
      },
      redGreenRefactor: {
        commitOptions: {} as RedGreenRefactorCommitTemplate,
        cliOptions: {},
      },
    } as unknown as Configuration;
    const configurationManagerWithoutConventionalCliOptionsTypes =
      new ConfigurationManagerImpl(configWithoutConventionalCliOptionsTypes);

    expect(
      configurationManagerWithoutConventionalCliOptionsTypes.getConventionalCliOptionsTypes()
    ).toEqual([]);
  });

  it("should return default value if conventional cli options scopes is not set", () => {
    const configWithoutConventionalCliOptionsScopes: Configuration = {
      version: "1.0.0",
      settings: {},
      conventional: {
        commitOptions: {} as ConventionalCommitTemplate,
        cliOptions: {},
      },
      redGreenRefactor: {
        commitOptions: {} as RedGreenRefactorCommitTemplate,
        cliOptions: {},
      },
    } as unknown as Configuration;
    const configurationManagerWithoutConventionalCliOptionsScopes =
      new ConfigurationManagerImpl(configWithoutConventionalCliOptionsScopes);

    expect(
      configurationManagerWithoutConventionalCliOptionsScopes.getConventionalCliOptionsScopes()
    ).toEqual([]);
  });

  it("should return default value if red green refactor commit template is not set", () => {
    const configWithoutRedGreenRefactorCommitTemplate: Configuration = {
      version: "1.0.0",
      settings: {},
      conventional: {
        commitOptions: {} as ConventionalCommitTemplate,
        cliOptions: {},
      },
      redGreenRefactor: {
        commitOptions: {} as RedGreenRefactorCommitTemplate,
        cliOptions: {},
      },
    } as unknown as Configuration;
    const configurationManagerWithoutRedGreenRefactorCommitTemplate =
      new ConfigurationManagerImpl(configWithoutRedGreenRefactorCommitTemplate);

    expect(
      configurationManagerWithoutRedGreenRefactorCommitTemplate.getRedGreenRefactorCommitTemplate()
    ).toBeUndefined();
  });

  it("should return default value if red green refactor commit template order is not set", () => {
    const configWithoutRedGreenRefactorCommitTemplateOrder: Configuration = {
      version: "1.0.0",
      settings: {},
      conventional: {
        commitOptions: {} as ConventionalCommitTemplate,
        cliOptions: {},
      },
      redGreenRefactor: {
        commitOptions: {} as RedGreenRefactorCommitTemplate,
        cliOptions: {},
      },
    } as unknown as Configuration;
    const configurationManagerWithoutRedGreenRefactorCommitTemplateOrder =
      new ConfigurationManagerImpl(
        configWithoutRedGreenRefactorCommitTemplateOrder
      );

    expect(
      configurationManagerWithoutRedGreenRefactorCommitTemplateOrder.getRedGreenRefactorCommitTemplateOrder()
    ).toEqual([]);
  });

  it("should return default value if red green refactor cli options types is not set", () => {
    const configWithoutRedGreenRefactorCliOptionsTypes: Configuration = {
      version: "1.0.0",
      settings: {},
      conventional: {
        commitOptions: {} as ConventionalCommitTemplate,
        cliOptions: {},
      },
      redGreenRefactor: {
        commitOptions: {} as RedGreenRefactorCommitTemplate,
        cliOptions: {},
      },
    } as unknown as Configuration;
    const configurationManagerWithoutRedGreenRefactorCliOptionsTypes =
      new ConfigurationManagerImpl(
        configWithoutRedGreenRefactorCliOptionsTypes
      );

    expect(
      configurationManagerWithoutRedGreenRefactorCliOptionsTypes.getRedGreenRefactorCliOptionsTypes()
    ).toEqual([]);
  });

  it("should return default value if exclude paths is not set", () => {
    const configWithoutExcludeFiles: Configuration = {
      version: "1.0.0",
      settings: {},
      conventional: {
        commitOptions: {} as ConventionalCommitTemplate,
        cliOptions: {},
      },
      redGreenRefactor: {
        commitOptions: {} as RedGreenRefactorCommitTemplate,
        cliOptions: {},
      },
    } as unknown as Configuration;
    const configurationManagerWithoutExcludeFiles =
      new ConfigurationManagerImpl(configWithoutExcludeFiles);

    expect(configurationManagerWithoutExcludeFiles.getExcludePaths()).toEqual(
      []
    );
  });
});
