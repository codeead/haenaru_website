import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

// 수리 이력(시공 사례) 컬렉션.
// 항목 1건 = src/content/works/<slug>/index.md + 같은 폴더의 사진 파일들.
// Decap CMS "repair_history" 컬렉션이 이 구조에 그대로 커밋한다.
const works = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "./src/content/works" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category: z.string(),
      workedAt: z.coerce.date(),
      locationRegion: z.string(),
      coverImage: image(),
      photos: z.array(image()).default([]),
      draft: z.boolean().default(false),
    }),
});

export const collections = { works };
