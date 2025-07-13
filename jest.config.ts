import type { Config } from "jest";

const config: Config = {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.stories.tsx",
    "!src/**/*.d.ts",
    "!**/vendor/**",
  ],
  testEnvironment: "jsdom",
  transform: {
    ".(ts|tsx)": [
      "ts-jest",
      {
        tsconfig: "tsconfig.jest.json",
      },
    ],
  },

  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/coverage",
    "package.json",
    "package-lock.json",
  ],
};

module.exports = config;
