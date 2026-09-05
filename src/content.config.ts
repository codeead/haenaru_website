import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

// 수리 이력(시공 사례) 컬렉션.
// 항목 1건 = src/content/works/<slug>/index.md + 같은 폴더의 사진 파일들.
// 사진을 index.md 와 같은 폴더에 두면 astro:assets 가 빌드 시 최적화한다.
const works = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "./src/content/works" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category: z.string(),
      workedAt: z.coerce.date(),
      locationRegion: z.string(),
      coverImage: image(),
      photos: z
        .array(z.object({ src: image(), alt: z.string().default("") }))
        .default([]),
      draft: z.boolean().default(false),
    }),
});

export const collections = { works };
