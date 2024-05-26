const preset = require("ts-jest/presets");

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  ...preset.jsWithTs,
  testMatch:["**/test/**/*.ts"],
  testEnvironment: "node",
  testTimeout: 30000,
  transformIgnorePatterns: [
    "node_modules",
    "dist",
    "lib",
    "prettierrc.js",
    "jest.config.js",
  ],
  coveragePathIgnorePatterns: ["test"],
};
