import { RedGreenOptions } from "../../../core/config/types";
import { RedGreenStore } from "../types";

/**
 * @class RedGreenRefactorFormatter
 * @description
 * It is responsible for formatting the commit message.
 * @method format
 * @static
 * @see RedGreenRefactorStateMachine
 * @see Configuration
 */
export class RedGreenRefactorFormatter {
  /**
   * @static
   * @method format
   * @description
   * It is responsible for formatting the commit message.
   * @param {RedGreenStore} store
   * @param {RedGreenOptions} options
   * @returns {string}
   * @memberof RedGreenRefactorFormatter
   */
  public static format(store: RedGreenStore, options: RedGreenOptions): string {
    const template = options.commitOptions.template;
    const templateOrder = options.commitOptions.templateOrder;

    const formattedCommit = templateOrder
      .map((templateKey) => {
        switch (templateKey) {
          case "type":
            return template.type.replace("{{type}}", store.type);
          case "subject":
            return template.subject.replace("{{subject}}", store.message);
          default:
            return "";
        }
      })
      .join("");

    return formattedCommit.replace(/\\n/g, "\n");
  }
}
