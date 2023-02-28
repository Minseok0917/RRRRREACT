import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
const resolveAlias = Object.fromEntries(
  Object.entries({
    "@components": "./src/components",
    "@pages": "./src/pages",
  }).map(([key, value]) => [key, path.resolve(__dirname, value)])
);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: resolveAlias,
  },
});
