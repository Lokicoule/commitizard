import { RedGreenOptions } from "../../../core/config/types";
import { RedGreenCommitFormatter } from "./RedGreenCommitFormatter";

describe("RedGreenCommitFormatter", () => {
  it("should format a commit", () => {
    const options = {
      commitOptions: {
        template: {
          type: "{{type}}: ",
          subject: "{{subject}}",
        },
        templateOrder: ["type", "subject"],
      },
      cliOptions: {
        types: [],
        redPatterns: [],
        greenPatterns: [],
        refactorPatterns: [],
        refactorOptions: [],
      },
    } as RedGreenOptions;
    const commit = {
      type: { data: "GREEN" },
      subject: {
        pattern: "{{feature}} {{subject}}",
        options: [{ key: "subject", value: "add new feature" }],
        feature: { data: "teahupoo" },
      },
    };
    const formatter = new RedGreenCommitFormatter(options);
    const formattedCommit = formatter.format(commit);
    expect(formattedCommit).toEqual("GREEN: teahupoo add new feature");
  });

  it("should format a commit with multiple options", () => {
    const options = {
      commitOptions: {
        template: {
          type: "{{type}} ",
          subject: "{{subject}}",
        },
        templateOrder: ["type", "subject"],
      },
      cliOptions: {
        types: [],
        redPatterns: [],
        greenPatterns: [],
        refactorPatterns: [],
        refactorOptions: [],
      },
    } as RedGreenOptions;
    const commit = {
      type: { data: "REFACTOR" },
      subject: {
        pattern: "{{performance/maintainability/readability/usability}}",
        options: [{ key: "performance", value: "performance" }],
        feature: { data: "teahupoo" },
      },
    };
    const formatter = new RedGreenCommitFormatter(options);
    const formattedCommit = formatter.format(commit);
    expect(formattedCommit).toEqual(
      "REFACTOR teahupoo add new feature add new feature"
    );
  });
});
