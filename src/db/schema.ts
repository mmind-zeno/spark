import { pgTable, serial, integer, timestamp } from "drizzle-orm/pg-core";

export const certificateDownloads = pgTable("certificate_downloads", {
  id: serial("id").primaryKey(),
  count: integer("count").notNull().default(0),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
