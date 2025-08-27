import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import fs from "node:fs";
import path from "node:path";

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ["src/VegaEmbed.tsx"],
      afterBuild: () => {
        fs.renameSync(
          path.resolve(__dirname, "dist/VegaEmbed.d.ts"),
          path.resolve(__dirname, "dist/react-vega.d.ts")
        );
      },
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/VegaEmbed.tsx"),
      name: "VegaEmbed",
      fileName: "react-vega",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "vega-embed",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
          "vega-embed": "embed",
        },
      },
    },
  },
});
