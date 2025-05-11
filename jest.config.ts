import type { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";
import nextJest from "next/jest";
import { compilerOptions } from "./tsconfig.json";

const createJestConfig = nextJest({
  // Path to Next.js app to load next.config.js and .env files in the test environment
  dir: "./",
});

const baseJestConfig = {
  preset: "ts-jest",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts", ".tsx"], // Treat TypeScript files as ESM
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Transform TS files
  },
};

const additionalConfig: Config = {
  coverageProvider: "v8",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Setup files after the test environment is initialized
  testEnvironment: "jsdom", // Override test environment to jsdom
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^@/prisma$": "<rootDir>/utils/db.ts",
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" }),
  },
  reporters: [
    "default", // Pour afficher le rapport dans le terminal
    ["jest-junit", { outputDirectory: "reports", outputName: "junit.xml" }],
  ],
  coverageDirectory: "coverage", // Pour générer le rapport de couverture
};

// Merge base Jest config with additional custom config
const finalJestConfig = {
  ...baseJestConfig,
  ...additionalConfig,
};

export default createJestConfig(finalJestConfig);
