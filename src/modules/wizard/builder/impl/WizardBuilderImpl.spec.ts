import { WizardBuilderImpl } from "./WizardBuilderImpl";

describe("WizardBuilderImpl", () => {
  it("should build a WizardBuilder object", () => {
    const message = "test message";
    const files = ["test file 1", "test file 2"];

    const builder = new WizardBuilderImpl();

    const commit = builder.withMessage(message).withFiles(files).build();

    expect(commit.message).toBe(message);
    expect(commit.files).toStrictEqual(files);
  });

  it("should build a WizardBuilder object with no files", () => {
    const message = "test message";

    const builder = new WizardBuilderImpl();

    const commit = builder.withMessage(message).build();

    expect(commit.message).toBe(message);
    expect(commit.files).toStrictEqual([]);
  });

  it("should build a WizardBuilder object with no message", () => {
    const files = ["test file 1", "test file 2"];

    const builder = new WizardBuilderImpl();

    const commit = builder.withFiles(files).build();

    expect(commit.message).toBe("");
    expect(commit.files).toStrictEqual(files);
  });
});
