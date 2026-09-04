// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// 도메인이 확정되면 site 값을 실제 도메인으로 교체한다 (sitemap/OG 절대경로 생성에 사용됨).
export default defineConfig({
  site: "https://example.com",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
