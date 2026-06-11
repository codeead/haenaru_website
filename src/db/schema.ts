import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

/**
 * 시공사례. There is intentionally no `inquiries` table — inquiries are handled
 * entirely through the KakaoTalk Channel chat button (see spec §7).
 */
export const works = sqliteTable("works", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  workedAt: text("worked_at").notNull(),
  /** Public, district/dong level only (e.g. "달성군"). */
  locationRegion: text("location_region").notNull(),
  /** Internal only — never exposed on public pages. */
  locationDetail: text("location_detail"),
  /** Internal only — never exposed on public pages. */
  lat: real("lat"),
  lng: real("lng"),
  coverPhotoId: text("cover_photo_id"),
  isPublished: integer("is_published").notNull().default(0),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
  deletedAt: text("deleted_at"),
});

export const workPhotos = sqliteTable("work_photos", {
  id: text("id").primaryKey(),
  workId: text("work_id")
    .notNull()
    .references(() => works.id),
  /** R2 key for the web-sized derivative (max 1600px). */
  r2KeyFull: text("r2_key_full").notNull(),
  /** R2 key for the thumbnail derivative (max 400px). */
  r2KeyThumb: text("r2_key_thumb").notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: text("created_at").notNull(),
});

export type Work = typeof works.$inferSelect;
export type NewWork = typeof works.$inferInsert;
export type WorkPhoto = typeof workPhotos.$inferSelect;
export type NewWorkPhoto = typeof workPhotos.$inferInsert;
