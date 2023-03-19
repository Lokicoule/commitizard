import { Configuration } from "../../../core/config";
import { RedGreenRefactorStateMachine } from "../state-machine/RedGreenRefactorStateMachine";

export class RedGreenRefactorFormatter {
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
