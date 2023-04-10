import { bgBlue, bgCyan, black } from "picocolors";
import { PromptAdapter } from "~/adapters/prompt/PromptAdapter";
import {
  Confirm,
  MultiSelect,
  MultiText,
  Select,
  SelectOption,
  Text,
} from "~/adapters/prompt/types";
import { chunk } from "~/core/utils/chunk";
import { IntroInput, IPaginateOptions, OutroInput } from "../types";
import { PromptManager } from "../interface/PromptManager";

export class PromptManagerImpl implements PromptManager {
  private readonly adapter: PromptAdapter;

  private constructor(adapter: PromptAdapter) {
    this.adapter = adapter;
  }

  public static create(adapter: PromptAdapter): PromptManager {
    return new PromptManagerImpl(adapter);
  }

  public async confirm({
    message,
    defaultValue = false,
    abortMessage,
  }: Confirm): Promise<boolean> {
    return this.adapter.confirm({
      message,
      defaultValue,
      abortMessage,
    });
  }

  public async text({
    message,
    placeholder,
    defaultValue,
    abortMessage,
    validate,
  }: Text): Promise<string> {
    return this.adapter.text({
      message,
      placeholder,
      defaultValue,
      abortMessage,
      validate,
    });
  }

  public async multiText(options: MultiText): Promise<string[]> {
    return this.adapter.multiText(options);
  }

  public async select<Option extends SelectOption<T>[], T>(
    options: Select<Option, T>
  ): Promise<T> {
    return this.adapter.select(options);
  }

  public async multiSelect<Option extends SelectOption<T>[], T>({
    message,
    options,
    required = false,
    abortMessage,
  }: MultiSelect<Option, T>): Promise<T[]> {
    return this.adapter.multiSelect({
      message: `${message} (Press <space> to select, <enter> to continue / skip, <arrow keys> to navigate)`,
      options,
      required,
      abortMessage,
    });
  }

  public async intro({ message }: IntroInput): Promise<void> {
    return this.adapter.intro(bgCyan(black(message)));
  }

  public async outro({ message }: OutroInput): Promise<void> {
    return this.adapter.outro(bgCyan(black(message)));
  }

  public log: {
    info: (message: string) => void;
    error: (message: string) => void;
    warn: (message: string) => void;
    success: (message: string) => void;
  } = {
    info: (message) => this.adapter.log.info(message),
    error: (message) => this.adapter.log.error(message),
    warn: (message) => this.adapter.log.warn(message),
    success: (message) => this.adapter.log.success(message),
  };

  public async multiSelectPaginate<Option extends SelectOption<T>[], T>(
    options: MultiSelect<Option, T> & IPaginateOptions
  ): Promise<T[]> {
    const { pageSize, message, confirmMessage } = options;
    const itemChunks = chunk(options.options, pageSize);
    const totalPages = itemChunks.length;
    const results: T[] = [];

    for (let i = 0; i < itemChunks.length; i++) {
      const itemsToShow = itemChunks[i];
      const currentPage = i + 1;
      const remainingItems =
        options.options.length - (i * pageSize + itemsToShow.length);

      const paginateMessage = `Page ${currentPage}/${totalPages}\n${bgBlue(
        message
      )} `;

      const selectedOptions = await this.multiSelect<typeof itemsToShow, T>({
        message: paginateMessage,
        options: itemsToShow,
      });

      results.push(...selectedOptions);

      const shouldShowMore =
        remainingItems > 0
          ? await this.confirm({
              message: `Show ${Math.min(
                remainingItems,
                pageSize
              )} more ${confirmMessage}? (Page ${
                currentPage + 1
              }/${totalPages})`,
              defaultValue: true,
            })
          : false;

      if (!shouldShowMore) {
        break;
      }
    }

    return results;
  }
}
