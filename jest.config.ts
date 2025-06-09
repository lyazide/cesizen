// jest.config.ts

import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

// Add any custom config to be passed to Jest
// the ones listed should cover for most projects

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",

  // Check the structuredClone Conundrum to understand this line
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/app/(.*)$": "<rootDir>/src/app/$1",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  // This part is crucial for handling static assets
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  collectCoverageFrom: [
    //"src/**/*.{js,jsx,ts,tsx}",
    //"!src/**/*.d.ts",
    //"!src/**/types.ts",
    "src/app/api/**/*.{js,jsx,ts,tsx}",
    "!src/app/api/__mock__/**/*.{js,jsx,ts,tsx}", // Exclude mocks
  ],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
};

export default createJestConfig(config);
