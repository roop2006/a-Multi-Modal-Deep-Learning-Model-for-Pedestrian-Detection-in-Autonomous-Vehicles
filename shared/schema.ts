import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, real, jsonb, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const detectionResults = pgTable("detection_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  filename: text("filename").notNull(),
  originalUrl: text("original_url").notNull(),
  processedUrl: text("processed_url"),
  detections: jsonb("detections").$type<{
    bbox: [number, number, number, number];
    confidence: number;
    class: string;
  }[]>().notNull().default([]),
  processingTime: real("processing_time").notNull(),
  totalPedestrians: integer("total_pedestrians").notNull().default(0),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const systemMetrics = pgTable("system_metrics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  accuracy: real("accuracy").notNull(),
  precision: real("precision").notNull(),
  recall: real("recall").notNull(),
  avgProcessingTime: real("avg_processing_time").notNull(),
  totalProcessed: integer("total_processed").notNull(),
  highRiskDetections: integer("high_risk_detections").notNull(),
  recentDetections: integer("recent_detections").notNull(),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const insertDetectionResultSchema = createInsertSchema(detectionResults).omit({
  id: true,
  createdAt: true,
});

export const insertSystemMetricsSchema = createInsertSchema(systemMetrics).omit({
  id: true,
  updatedAt: true,
});

export type DetectionResult = typeof detectionResults.$inferSelect;
export type InsertDetectionResult = z.infer<typeof insertDetectionResultSchema>;
export type SystemMetrics = typeof systemMetrics.$inferSelect;
export type InsertSystemMetrics = z.infer<typeof insertSystemMetricsSchema>;
