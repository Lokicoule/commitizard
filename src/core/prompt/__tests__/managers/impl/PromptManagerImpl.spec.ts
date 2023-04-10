import { bgCyan, black } from "picocolors";
import { PromptAdapter } from "~/adapters/prompt/interfaces/PromptAdapter";
import { MultiText } from "~/adapters/prompt/types";
import { PromptManagerImpl } from "~/core/prompt/managers/impl/PromptManagerImpl";
import { PromptManager } from "../../../managers/interfaces/PromptManager";

describe("PromptManagerImpl", () => {
  let adapter: PromptAdapter;
  let sut: PromptManager;

  beforeEach(() => {
    adapter = {
      confirm: jest.fn(),
      intro: jest.fn(),
      log: {
        info: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
        success: jest.fn(),
      },
      multiSelect: jest.fn(),
      multiText: jest.fn(),
      outro: jest.fn(),
      select: jest.fn(),
      text: jest.fn(),
    };

    sut = new PromptManagerImpl(adapter);
  });

  describe("confirm", () => {
    it("should call the adapter with the correct options", async () => {
      const options = {
        message: "message",
        defaultValue: false,
        abortMessage: "abortMessage",
      };

      await sut.confirm(options);

      expect(adapter.confirm).toHaveBeenCalledWith(options);
    });
  });

  describe("text", () => {
    it("should call the adapter with the correct options", async () => {
      const options = {
        message: "message",
        placeholder: "placeholder",
        defaultValue: "defaultValue",
        abortMessage: "abortMessage",
        validate: jest.fn(),
      };

      await sut.text(options);

      expect(adapter.text).toHaveBeenCalledWith(options);
    });
  });

  describe("multiText", () => {
    it("should call the adapter with the correct options", async () => {
      const options = {
        message: "message",
        placeholder: "placeholder",
        defaultValue: "defaultValue",
        abortMessage: "abortMessage",
        validate: jest.fn(),
        confirm: {
          message: "message",
          defaultValue: false,
          abortMessage: "abortMessage",
        },
        text: {
          message: "message",
          placeholder: "placeholder",
          defaultValue: "defaultValue",
          abortMessage: "abortMessage",
          validate: jest.fn(),
        },
      } as MultiText;

      await sut.multiText(options);

      expect(adapter.multiText).toHaveBeenCalledWith(options);
    });
  });

  describe("select", () => {
    it("should call the adapter with the correct options", async () => {
      const options = {
        message: "message",
        options: [
          {
            label: "label",
            value: "value",
          },
        ],
        defaultValue: "defaultValue",
        abortMessage: "abortMessage",
      };

      await sut.select(options);

      expect(adapter.select).toHaveBeenCalledWith(options);
    });
  });

  describe("multiSelect", () => {
    it("should call the adapter with the correct options", async () => {
      const options = {
        message: "message",
        options: [
          {
            label: "label",
            value: "value",
          },
        ],
        abortMessage: "abortMessage",
        required: false,
      };

      await sut.multiSelect(options);

      expect(adapter.multiSelect).toHaveBeenCalledWith({
        ...options,
        message: expect.stringContaining(
          "(Press <space> to select, <enter> to continue / skip, <arrow keys> to navigate)"
        ),
      });
    });
  });

  describe("intro", () => {
    it("should call the adapter with the correct options", async () => {
      const options = {
        message: "message",
      };

      await sut.intro(options);

      expect(adapter.intro).toHaveBeenCalledWith(
        bgCyan(black(options.message))
      );
    });
  });

  describe("outro", () => {
    it("should call the adapter with the correct options", async () => {
      const options = {
        message: "message",
      };

      await sut.outro(options);

      expect(adapter.outro).toHaveBeenCalledWith(
        bgCyan(black(options.message))
      );
    });
  });

  describe("log", () => {
    it("should call the adapter with the correct options", async () => {
      const message = "message";

      sut.log.info(message);
      sut.log.error(message);
      sut.log.warn(message);
      sut.log.success(message);

      expect(adapter.log.info).toHaveBeenCalledWith(message);
      expect(adapter.log.error).toHaveBeenCalledWith(message);
      expect(adapter.log.warn).toHaveBeenCalledWith(message);
      expect(adapter.log.success).toHaveBeenCalledWith(message);
    });
  });

  describe("multiSelectPaginate", () => {
    it("should paginate options and call multiSelect with each chunk", async () => {
      const options = {
        message: "message",
        options: [
          { label: "label1", value: "value1" },
          { label: "label2", value: "value2" },
          { label: "label3", value: "value3" },
          { label: "label4", value: "value4" },
          { label: "label5", value: "value5" },
        ],
        pageSize: 2,
        confirmMessage: "confirmMessage",
      };

      (
        adapter.multiSelect as jest.MockedFunction<typeof adapter.multiSelect>
      ).mockReturnValue(Promise.resolve([]));
      (
        adapter.confirm as jest.MockedFunction<typeof adapter.confirm>
      ).mockReturnValue(Promise.resolve(true));

      await sut.multiSelectPaginate(options);

      expect(adapter.multiSelect).toHaveBeenCalledTimes(3);
      expect(
        (adapter.multiSelect as jest.MockedFunction<typeof adapter.multiSelect>)
          .mock.calls[0][0].options
      ).toEqual([
        { label: "label1", value: "value1" },
        { label: "label2", value: "value2" },
      ]);
      expect(
        (adapter.multiSelect as jest.MockedFunction<typeof adapter.multiSelect>)
          .mock.calls[1][0].options
      ).toEqual([
        { label: "label3", value: "value3" },
        { label: "label4", value: "value4" },
      ]);
      expect(
        (adapter.multiSelect as jest.MockedFunction<typeof adapter.multiSelect>)
          .mock.calls[2][0].options
      ).toEqual([{ label: "label5", value: "value5" }]);
      expect(adapter.confirm).toHaveBeenCalledTimes(2);
    });
  });
});
