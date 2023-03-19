import { Configuration } from "../../../core/config";
import { RedGreenCommitSubject } from "../builder/impl/RedGreenCommitBuilderImpl";
import { RedGreenCommitStateMachine } from "../state-machine/RedGreenCommitStateMachine";

export class RedGreenCommitFormatter {
  public static format(stateMachine: RedGreenCommitStateMachine): string {
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
