import {
  confirm,
  intro,
  multiselect,
  outro,
  select,
  text,
} from "@clack/prompts";

import {
  ConfirmOptions,
  MultiSelectOptions,
  Primitive,
  PromptAdapter,
  SelectOptions,
  TextOptions,
} from "./prompt.adapter";

export class ClackPromptAdapter implements PromptAdapter {
  begin(title?: string) {
    intro(title);
  }

  end(message?: string) {
    outro(message);
  }

  async select<T extends Primitive>(options: SelectOptions<T>) {
    const response = (await select({
      message: options.message,
      options: options.options,
      initialValue: options.initialValue,
    })) as T;
    return response;
  }

  async multiSelect<T extends Primitive>(options: MultiSelectOptions<T>) {
    const response = (await multiselect({
      message: options.message,
      options: options.options,
      initialValues: options.initialValues,
      required: options.required,
      cursorAt: options.cursorAt,
    })) as T[];
    return response;
  }

  async text(options: TextOptions) {
    const response = (await text({
      message: options.message,
      placeholder: options.placeholder,
      defaultValue: options.defaultValue,
      initialValue: options.initialValue,
      validate: options.validate,
    })) as string;
    return response;
  }

  async confirm(options: ConfirmOptions) {
    const response = (await confirm({
      message: options.message,
      active: options.active,
      inactive: options.inactive,
      initialValue: options.initialValue,
    })) as boolean;
    return response;
  }
}
