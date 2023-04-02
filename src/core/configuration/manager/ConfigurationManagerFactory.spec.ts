import { Configuration } from "../types";
import { ConfigurationManagerFactory } from "./ConfigurationManagerFactory";
import { ConfigurationManagerImpl } from "./impl/ConfigurationManagerImpl";

describe("ConfigurationManagerFactory", () => {
  it("should create a ConfigurationManager", () => {
    expect(
      ConfigurationManagerFactory.create({} as Configuration)
    ).toBeInstanceOf(ConfigurationManagerImpl);
  });
});
