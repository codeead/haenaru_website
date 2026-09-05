// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// sitemap·canonical·OG 절대경로 생성에 쓰이는 실제 서비스 도메인. public/CNAME 과 항상 같은 값이어야 한다.
export default defineConfig({
  site: "https://haenarueng.com",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
