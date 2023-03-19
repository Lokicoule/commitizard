import { RedGreenRefactorStateMachineFactoryImpl } from "../factories/impl/RedGreenRefactorStateMachineFactoryImpl";
import { RedGreenRefactorFormatter } from "./RedGreenRefactorFormatter";
import { RedGreenOptions } from "../../../core/config/types";

const stubOptions = {
  commitOptions: {
    template: {
      type: "{{type}}",
      subject: ": {{subject}}",
    },
    templateOrder: ["type", "subject"],
  },
} as RedGreenOptions;

describe("RedGreenRefactorFormatter", () => {
  it("should format commit", () => {
    const stateMachine = new RedGreenRefactorStateMachineFactoryImpl().create();
    stateMachine.setType("type");
    stateMachine.setMessage("message");
    const formattedCommit = RedGreenRefactorFormatter.format(
      stateMachine,
      stubOptions
    );
    expect(formattedCommit).toBe("type: message");
  });
});
