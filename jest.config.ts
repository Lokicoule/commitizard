import type { Config } from "jest";

const config: Config = {
  verbose: true,
  testEnvironment: "node",
  testMatch: ["**/*.spec.ts?(x)"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  transformIgnorePatterns: ["/node_modules/", "/dist/"],
  moduleFileExtensions: ["js", "ts"],
  collectCoverage: true,
  collectCoverageFrom: ["**/*.ts", "!**/index.(t|j)s"],
  coverageDirectory: "../coverage",
  coverageReporters: ["text", "lcov"],
  coveragePathIgnorePatterns: ["/node_modules/", "/dist/"],
  coverageThreshold: {
    global: {
      branches: 90,
      statements: 90,
    },
  },
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/$1",
  },
  rootDir: "./src",
};

export default config;
