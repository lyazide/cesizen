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
        fonts: {
          heading: { value: "'Playfair Display', serif" }, // Élégante et sophistiquée
          body: { value: "'Open Sans', sans-serif" }, // Simple et lisible
          modern: { value: "'Roboto', sans-serif" }, // Moderne et lisible
          warm: { value: "'Lato', sans-serif" }, // Ressenti chaleureux
          traditional: { value: "'Merriweather', serif" }, // Ressenti traditionnel et adapté à l'écran
          personality: { value: "'Pacifico', cursive" }, // Touche de personnalité
          relaxing: { value: "'Dancing Script', cursive" }, // Style relaxant
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
