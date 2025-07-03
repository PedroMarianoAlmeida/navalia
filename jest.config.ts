import type { Config } from "jest";

const config: Config = {
  // use ts-jest for any .ts/.tsx files
  preset: "ts-jest",

  // simulate a browser-like environment
  testEnvironment: "jsdom",

  // (optional) if you use CSS imports in your code
  moduleNameMapper: {
    "^.+\\.(css|scss)$": "identity-obj-proxy",
  },

  // make sure Jest picks up .ts/.tsx tests
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
};

export default config;
