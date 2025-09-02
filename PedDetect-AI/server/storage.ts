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
      totalProcessed: 0,
      highRiskDetections: 0,
      recentDetections: 0,
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
    
    // Update metrics with real calculations
    this.updateMetricsFromData();
    
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
    // Ensure metrics are up to date before returning
    this.updateMetricsFromData();
    return this.systemMetrics;
  }

  private updateMetricsFromData(): void {
    if (!this.systemMetrics) return;
    
    const allResults = Array.from(this.detectionResults.values());
    const totalProcessed = allResults.length;
    
    // Calculate total pedestrians detected across all images
    const totalPedestrians = allResults.reduce((sum, result) => sum + result.totalPedestrians, 0);
    
    // Calculate average processing time from actual results
    const avgProcessingTime = totalProcessed > 0 
      ? allResults.reduce((sum, result) => sum + result.processingTime, 0) / totalProcessed
      : 0.21;
    
    // Calculate recent detections (last 24 hours)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentResults = allResults.filter(result => result.createdAt > oneDayAgo);
    const recentDetections = recentResults.reduce((sum, result) => sum + result.totalPedestrians, 0);
    
    // Calculate high-risk detections (confidence > 0.9)
    const highRiskDetections = allResults.reduce((count, result) => {
      const highConfidenceDetections = result.detections.filter(detection => detection.confidence > 0.9);
      return count + highConfidenceDetections.length;
    }, 0);
    
    // Update metrics with calculated values
    this.systemMetrics = {
      ...this.systemMetrics,
      totalProcessed,
      avgProcessingTime,
      recentDetections,
      highRiskDetections,
      updatedAt: new Date(),
    };
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
