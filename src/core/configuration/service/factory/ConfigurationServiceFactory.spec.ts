import { ConfigurationServiceImpl } from "../impl/ConfigurationServiceImpl";
import { ConfigurationServiceFactory } from "./ConfigurationServiceFactory";

describe("ConfigurationServiceFactory", () => {
  it("should create a ConfigurationService", () => {
    expect(ConfigurationServiceFactory.create()).toBeInstanceOf(
      ConfigurationServiceImpl
    );
  });
});
