import { Configuration } from "../../../core/config";
import { RedGreenRefactorStateMachine } from "../state-machine/RedGreenRefactorStateMachine";

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
   * @param {RedGreenRefactorStateMachine} stateMachine
   * @returns {string}
   * @memberof RedGreenRefactorFormatter
   */
  public static format(stateMachine: RedGreenRefactorStateMachine): string {
    const template =
      Configuration.getConfig()["red-green-refactor"].commitOptions.template;
    const templateOrder =
      Configuration.getConfig()["red-green-refactor"].commitOptions
        .templateOrder;

    const formattedCommit = templateOrder
      .map((templateKey) => {
        switch (templateKey) {
          case "type":
            return template.type.replace("{{type}}", stateMachine.getType());
          case "subject":
            return template.subject.replace(
              "{{subject}}",
              stateMachine.getMessage()
            );
          default:
            return "";
        }
      })
      .join("");

    return formattedCommit.replace(/\\n/g, "\n");
  }
}
