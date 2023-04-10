import { ClackPromptAdapter } from "./ClackPromptAdapter";
import * as clackPrompts from "@clack/prompts";
import {
  Confirm,
  MultiSelect,
  MultiText,
  Select,
  SelectOption,
  Text,
} from "../types";

jest.mock("@clack/prompts");

describe("ClackPromptAdapter", () => {
  let adapter: ClackPromptAdapter;

  beforeEach(() => {
    adapter = new ClackPromptAdapter();
  });

  it("should log info message", () => {
    adapter.log.info("Test info message");
    expect(clackPrompts.log.info).toHaveBeenCalledWith("Test info message");
  });

  it("should log warning message", () => {
    adapter.log.warn("Test warning message");
    expect(clackPrompts.log.warn).toHaveBeenCalledWith("Test warning message");
  });

  it("should log error message", () => {
    adapter.log.error("Test error message");
    expect(clackPrompts.log.error).toHaveBeenCalledWith("Test error message");
  });

  it("should log success message", () => {
    adapter.log.success("Test success message");
    expect(clackPrompts.log.success).toHaveBeenCalledWith(
      "Test success message"
    );
  });

  it("should confirm", async () => {
    (clackPrompts.confirm as jest.Mock).mockResolvedValue(true);

    const confirmOptions: Confirm = {
      message: "Are you sure?",
      defaultValue: true,
      abortMessage: "Operation canceled",
    };
    const result = await adapter.confirm(confirmOptions);
    expect(result).toBeTruthy();
    expect(clackPrompts.confirm).toHaveBeenCalledWith({
      message: "Are you sure?",
      initialValue: true,
    });
  });

  it("should prompt for text input", async () => {
    (clackPrompts.text as jest.Mock).mockResolvedValue("Test text input");

    const textOptions: Text = {
      message: "Enter some text:",
      placeholder: "Type here...",
      defaultValue: "",
      abortMessage: "Operation canceled",
    };
    const result = await adapter.text(textOptions);
    expect(result).toEqual("Test text input");
    expect(clackPrompts.text).toHaveBeenCalledWith({
      message: "Enter some text:",
      initialValue: "",
      placeholder: "Type here...",
    });
  });

  it("should prompt for text input with validation", async () => {
    (clackPrompts.text as jest.Mock).mockResolvedValue("Test text input");

    const textOptions: Text = {
      message: "Enter some text:",
      placeholder: "Type here...",
      defaultValue: "",
      abortMessage: "Operation canceled",
      validate: (value) => "Validate",
    };
    const result = await adapter.text(textOptions);
    expect(result).toEqual("Test text input");
    expect(clackPrompts.text).toHaveBeenCalledWith({
      message: "Enter some text:",
      initialValue: "",
      placeholder: "Type here...",
      validate: textOptions.validate,
    });
  });

  // Add these tests to the existing test suite
  it("should prompt for multiple text inputs", async () => {
    (clackPrompts.text as jest.Mock)
      .mockResolvedValueOnce("First line")
      .mockResolvedValueOnce("Second line")
      .mockResolvedValueOnce("");
    (clackPrompts.confirm as jest.Mock)
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(false);

    const multiTextOptions: MultiText = {
      text: {
        message: "Enter some text:",
        placeholder: "Type here...",
        defaultValue: "",
        abortMessage: "Operation canceled",
      },
      confirm: {
        message: "Add another line?",
        defaultValue: true,
        abortMessage: "Operation canceled",
      },
    };

    const result = await adapter.multiText(multiTextOptions);
    expect(result).toEqual(["First line", "Second line"]);
  });

  it("should prompt for single selection", async () => {
    (clackPrompts.select as jest.Mock).mockResolvedValue("Option A");

    const selectOptions: Select<SelectOption<string>[], string> = {
      message: "Select an option:",
      options: [
        { label: "Option A", value: "Option A" },
        { label: "Option B", value: "Option B" },
      ],
      defaultValue: "Option A",
      abortMessage: "Operation canceled",
    };

    const result = await adapter.select(selectOptions);
    expect(result).toEqual("Option A");
  });

  it("should prompt for multiple selections", async () => {
    (clackPrompts.multiselect as jest.Mock).mockResolvedValue([
      "Option A",
      "Option B",
    ]);

    const multiSelectOptions: MultiSelect<SelectOption<string>[], string> = {
      message: "Select multiple options:",
      options: [
        { label: "Option A", value: "Option A" },
        { label: "Option B", value: "Option B" },
      ],
      required: false,
      abortMessage: "Operation canceled",
    };

    const result = await adapter.multiSelect(multiSelectOptions);
    expect(result).toEqual(["Option A", "Option B"]);
  });

  it("should display intro message", async () => {
    await adapter.intro("Intro message");
    expect(clackPrompts.intro).toHaveBeenCalledWith("Intro message");
  });

  it("should display outro message", async () => {
    await adapter.outro("Outro message");
    expect(clackPrompts.outro).toHaveBeenCalledWith("Outro message");
  });

  it("should abort confirm prompt", async () => {
    const confirmOptions: Confirm = {
      message: "Are you sure?",
      defaultValue: true,
      abortMessage: "Operation canceled",
    };

    (clackPrompts.confirm as jest.Mock).mockResolvedValue(false);
    await expect(adapter.confirm(confirmOptions)).resolves.toBeFalsy();
  });

  it("should abort and exit process on cancel", async () => {
    const confirmOptions: Confirm = {
      message: "Are you sure?",
      defaultValue: true,
      abortMessage: "Operation canceled",
    };

    (clackPrompts.confirm as jest.Mock).mockResolvedValue(
      Symbol.for("clack.cancel")
    );
    (clackPrompts.isCancel as unknown as jest.Mock).mockReturnValue(true);
    (clackPrompts.cancel as jest.Mock).mockImplementation(() => {});

    const processExitSpy = jest
      .spyOn(process, "exit")
      .mockImplementation(() => {
        throw new Error("process.exit called");
      });

    try {
      await adapter.confirm(confirmOptions);
    } catch (error: any) {
      expect(error.message).toBe("process.exit called");
    }

    expect(clackPrompts.cancel).toHaveBeenCalledWith(
      confirmOptions.abortMessage
    );
    expect(processExitSpy).toHaveBeenCalledWith(0);

    processExitSpy.mockRestore();
  });
});
