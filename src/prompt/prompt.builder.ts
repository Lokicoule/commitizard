import { PromptAdapter } from "../adapters/prompt.adapter";

export type PromptConfig = {
  type: "select" | "multiselect" | "text" | "confirm";
  message: string;
  options?: any[];
  placeholder?: string;
  defaultValue?: string;
  validate?: (value: string) => string | void;
  active?: string;
  inactive?: string;
  initialValue?: any;
  initialValues?: any[];
  required?: boolean;
};

export class PromptBuilder {
  private adapter: PromptAdapter;
  private prompts: PromptConfig[];

  constructor(adapter: PromptAdapter) {
    this.adapter = adapter;
    this.prompts = [];
  }

  addSelect<T extends string | number | boolean>({
    message,
    options,
    initialValue,
  }: {
    message: string;
    options: { value: T; label: string }[];
    initialValue?: T;
  }) {
    this.prompts.push({
      type: "select",
      message,
      options: options.map((value) => ({ value, label: value.toString() })),
      initialValue,
    });
    return this;
  }

  addMultiSelect<T extends string | number | boolean>({
    message,
    options,
    initialValues,
    required = false,
  }: {
    message: string;
    options: T[];
    initialValues?: T[];
    required?: boolean;
  }) {
    this.prompts.push({
      type: "multiselect",
      message,
      options: options.map((value) => ({ value, label: value.toString() })),
      initialValues: initialValues ? initialValues : [],
      required,
    });
    return this;
  }

  addText({
    message,
    placeholder,
    defaultValue,
    validate,
  }: {
    message: string;
    placeholder?: string;
    defaultValue?: string;
    validate?: (value: string) => string | void;
  }) {
    this.prompts.push({
      type: "text",
      message,
      placeholder,
      defaultValue,
      validate,
    });
    return this;
  }

  addConfirm(
    message: string,
    active = "Yes",
    inactive = "No",
    initialValue?: boolean
  ) {
    this.prompts.push({
      type: "confirm",
      message,
      active,
      inactive,
      initialValue,
    });
    return this;
  }

  async run(title?: string, endMessage?: string): Promise<any[]> {
    this.adapter.begin(title);

    const responses = [];

    for (const prompt of this.prompts) {
      let response;

      switch (prompt.type) {
        case "select":
          response = await this.adapter.select({
            message: prompt.message,
            options: prompt.options,
            initialValue: prompt.initialValue,
          });
          break;
        case "multiselect":
          response = await this.adapter.multiSelect({
            message: prompt.message,
            options: prompt.options,
            initialValues: prompt.initialValues,
            required: prompt.required,
          });
          break;
        case "text":
          response = await this.adapter.text({
            message: prompt.message,
            placeholder: prompt.placeholder,
            defaultValue: prompt.defaultValue,
            validate: prompt.validate,
          });
          break;
        case "confirm":
          response = await this.adapter.confirm({
            message: prompt.message,
            active: prompt.active,
            inactive: prompt.inactive,
            initialValue: prompt.initialValue,
          });
          break;
      }
      responses.push(response);
    }
    this.adapter.end(endMessage);
    return responses;
  }
}
