import { type DetectionResult, type InsertDetectionResult, type SystemMetrics, type InsertSystemMetrics } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Detection Results
  createDetectionResult(result: InsertDetectionResult): Promise<DetectionResult>;
  getDetectionResult(id: string): Promise<DetectionResult | undefined>;
  getAllDetectionResults(): Promise<DetectionResult[]>;
  
  // System Metrics
  getSystemMetrics(): Promise<SystemMetrics | undefined>;
  updateSystemMetrics(metrics: InsertSystemMetrics): Promise<SystemMetrics>;
}

export class MemStorage implements IStorage {
  private detectionResults: Map<string, DetectionResult>;
  private systemMetrics: SystemMetrics | undefined;

  constructor() {
    this.detectionResults = new Map();
    
    // Initialize with default metrics
    this.systemMetrics = {
      id: randomUUID(),
      accuracy: 94.2,
      precision: 91.8,
      recall: 89.5,
      avgProcessingTime: 0.21,
      totalProcessed: 1247,
      highRiskDetections: 23,
      recentDetections: 142,
      updatedAt: new Date(),
    };
  }

  async createDetectionResult(insertResult: InsertDetectionResult): Promise<DetectionResult> {
    const id = randomUUID();
    const result: DetectionResult = {
      id,
      filename: insertResult.filename,
      originalUrl: insertResult.originalUrl,
      processedUrl: insertResult.processedUrl || null,
      detections: insertResult.detections || [],
      processingTime: insertResult.processingTime,
      totalPedestrians: insertResult.totalPedestrians || 0,
      createdAt: new Date(),
    };
    this.detectionResults.set(id, result);
    
    // Update metrics
    if (this.systemMetrics) {
      this.systemMetrics.totalProcessed += 1;
      this.systemMetrics.recentDetections += 1;
      this.systemMetrics.avgProcessingTime = 
        (this.systemMetrics.avgProcessingTime * (this.systemMetrics.totalProcessed - 1) + insertResult.processingTime) / 
        this.systemMetrics.totalProcessed;
    }
    
    return result;
  }

  async getDetectionResult(id: string): Promise<DetectionResult | undefined> {
    return this.detectionResults.get(id);
  }

  async getAllDetectionResults(): Promise<DetectionResult[]> {
    return Array.from(this.detectionResults.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getSystemMetrics(): Promise<SystemMetrics | undefined> {
    return this.systemMetrics;
  }

  async updateSystemMetrics(metrics: InsertSystemMetrics): Promise<SystemMetrics> {
    this.systemMetrics = {
      id: this.systemMetrics?.id || randomUUID(),
      ...metrics,
      updatedAt: new Date(),
    };
    return this.systemMetrics;
  }
}

export const storage = new MemStorage();
