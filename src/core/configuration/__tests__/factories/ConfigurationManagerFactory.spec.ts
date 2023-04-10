import { Configuration } from "../../types";
import { ConfigurationManagerFactory } from "../../factories/ConfigurationManagerFactory";
import { ConfigurationManagerImpl } from "../../managers/impl/ConfigurationManagerImpl";

describe("ConfigurationManagerFactory", () => {
  it("should create a ConfigurationManager", () => {
    expect(
      ConfigurationManagerFactory.create({} as Configuration)
    ).toBeInstanceOf(ConfigurationManagerImpl);
  });
});
