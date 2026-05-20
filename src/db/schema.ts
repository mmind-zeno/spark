import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";

export const certificateDownloads = pgTable("certificate_downloads", {
  id: serial("id").primaryKey(),
  count: integer("count").notNull().default(0),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const npsResponses = pgTable("nps_responses", {
  id: serial("id").primaryKey(),
  moduleId: text("module_id").notNull(),
  score: integer("score").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const moduleViews = pgTable("module_views", {
  id: serial("id").primaryKey(),
  moduleId: text("module_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
