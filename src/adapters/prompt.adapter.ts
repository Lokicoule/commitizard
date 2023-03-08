export type Primitive = Readonly<string | boolean | number>;

export type Option<Value> = Value extends Primitive
  ? {
      value: Value;
      label?: string;
      hint?: string;
    }
  : {
      value: Value;
      label: string;
      hint?: string;
    };

export type ConfirmOptions = {
  message: string;
  active?: string;
  inactive?: string;
  initialValue?: boolean;
};

export type TextOptions = {
  message: string;
  placeholder?: string;
  defaultValue?: string;
  initialValue?: string;
  validate?: (value: string) => string | void;
};

export type SelectOptions<T extends Primitive> = {
  message: string;
  options: Option<T>[];
  initialValue?: T;
};

export type MultiSelectOptions<T extends Primitive> = {
  message: string;
  options: Option<T>[];
  initialValues?: T[];
  required?: boolean;
  cursorAt?: T;
};

export interface PromptAdapter {
  begin(title?: string): void;
  end(message?: string): void;
  select: <T extends Primitive>(options: SelectOptions<T>) => Promise<T>;
  multiSelect: <T extends Primitive>(
    options: MultiSelectOptions<T>
  ) => Promise<T[]>;
  text: (options: TextOptions) => Promise<string>;
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}
