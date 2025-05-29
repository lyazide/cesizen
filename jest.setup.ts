// jest.setup.ts
import "@testing-library/jest-dom";
//import "structured-clone";
import "whatwg-fetch";

// implementation of structuredClone polyfill

if (typeof global.structuredClone !== "function") {
  global.structuredClone = function structuredClone(value) {
    if (value === null || value === undefined) {
      return value;
    }

    try {
      // For objects and arrays, use JSON methods
      if (typeof value === "object") {
        return JSON.parse(JSON.stringify(value));
      }

      // For primitive values, return directly
      return value;
    } catch (error) {
      console.warn("structuredClone polyfill failed:", error);

      // Returns a shallow copy as fallback
      return Array.isArray(value) ? [...value] : { ...value };
    }
  };
}

// Mock de window.matchMedia uniquement si window n'est pas défini
if (typeof window === "undefined") {
  global.window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
}

// Window matchMedia mock

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
// Error handling

const originalError = console.error;
console.error = (...args) => {
  // Ignores specific React errors during testing

  if (
    typeof args[0] === "string" &&
    (args[0].includes("Warning:") || args[0].includes("Error:"))
  ) {
    return;
  }
  originalError.call(console, ...args);
};
