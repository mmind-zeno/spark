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

export const progressSnapshots = pgTable("progress_snapshots", {
  id: serial("id").primaryKey(),
  syncCode: text("sync_code").notNull().unique(),
  data: text("data").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  expiresAt: timestamp("expires_at").notNull(),
});

export const certificates = pgTable("certificates", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  totalXp: integer("total_xp").notNull(),
  modulesCompleted: integer("modules_completed").notNull().default(5),
  completionHash: text("completion_hash").unique(),
  downloadCounted: integer("download_counted").notNull().default(0),
  issuedAt: timestamp("issued_at").notNull().defaultNow(),
});
