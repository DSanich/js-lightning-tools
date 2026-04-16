import type { Config } from "jest";

/**
 * Integration-style tests (Jest + Node + jest-fetch-mock).
 * Run with: yarn test:e2e
 */
const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["<rootDir>/setupJest.ts"],
  testMatch: ["<rootDir>/e2e/**/*.test.ts"],
};

export default config;
