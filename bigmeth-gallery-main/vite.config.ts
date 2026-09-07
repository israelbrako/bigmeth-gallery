import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tanstackStart({ server: { entry: "server" } }),
    react(),
    tailwindcss(),
    tsConfigPaths(),
  ],
  server: {
    port: 8080,
    proxy: {
      // Dev-only proxy for seeded images. Remove once images are in Supabase Storage.
      "/__l5e": {
        target: "https://c5102355-f4b8-4669-bf9b-6146bf8ea073.lovableproject.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
  resolve: {
    alias: { "@": "/src" },
  },
});
