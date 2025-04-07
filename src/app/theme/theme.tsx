import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#f6f4e7" }, // Couleur la plus claire
          100: { value: "#e2f0f0" },
          200: { value: "#c0d8d8" },
          300: { value: "#8eb1b7" },
          400: { value: "#8dac9d" }, // Couleur principale
          500: { value: "#658995" },
          600: { value: "#3f6067" },
          700: { value: "#2e4d53" }, // Teinte légèrement plus foncée et apaisante
          800: { value: "#1e363b" }, // Une couleur moderne, évoquant la sérénité
          900: { value: "#121d20" }, // Couleur la plus foncée, idéale pour les éléments
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
