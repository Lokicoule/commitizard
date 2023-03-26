import { ConfigCommand } from "../command/ConfigCommand";
import { ConfigCommandFactory } from "./ConfigCommandFactory";

describe("ConfigCommandFactory", () => {
  it("should create a ConfigCommand", () => {
    expect(ConfigCommandFactory.create()).toBeInstanceOf(ConfigCommand);
  });
});
