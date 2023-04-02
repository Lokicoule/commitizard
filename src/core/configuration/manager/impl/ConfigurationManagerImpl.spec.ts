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
});
