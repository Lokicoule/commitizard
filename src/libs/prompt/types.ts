type Message = {
  message: string;
};

export type Confirm = Message & {
  defaultValue?: boolean;
  abortMessage?: string;
};

export type Text = Message & {
  placeholder?: string;
  defaultValue?: string;
  abortMessage?: string;
};

export type MultiText = {
  text: Text;
  confirm: Confirm;
};

export type SelectOption<Value> = Value extends string | boolean | number
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

export type Select<Option extends SelectOption<T>[], T> = Message & {
  options: Option;
  defaultValue?: T;
  abortMessage?: string;
};

export type MultiSelect<Option extends SelectOption<T>[], T> = Message & {
  options: Option;
  required?: boolean;
  abortMessage?: string;
};

export type Intro = Message;

export type Outro = Message;

export type Log = Message & {
  level: "error" | "warn" | "success" | "info";
};
