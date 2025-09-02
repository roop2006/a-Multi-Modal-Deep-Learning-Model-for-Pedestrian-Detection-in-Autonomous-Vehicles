import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDetectionResultSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Ensure uploads directory exists
  if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
  }

  // Serve uploaded files
  app.use('/uploads', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
  app.use('/uploads', express.static('uploads'));

  // Get system metrics
  app.get('/api/metrics', async (req, res) => {
    try {
      const metrics = await storage.getSystemMetrics();
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch metrics' });
    }
  });

  // Get all detection results
  app.get('/api/detections', async (req, res) => {
    try {
      const results = await storage.getAllDetectionResults();
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch detection results' });
    }
  });

  // Get specific detection result
  app.get('/api/detections/:id', async (req, res) => {
    try {
      const result = await storage.getDetectionResult(req.params.id);
      if (!result) {
        return res.status(404).json({ message: 'Detection result not found' });
      }
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch detection result' });
    }
  });

  // Upload and process image
  app.post('/api/detect', upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No image file provided' });
      }

      const startTime = Date.now();
      
      // Simulate ML processing - In a real implementation, this would call a Python ML service
      const mockDetections = [
        {
          bbox: [0.15, 0.2, 0.35, 0.65] as [number, number, number, number],
          confidence: 0.92,
          class: 'person'
        },
        {
          bbox: [0.45, 0.25, 0.63, 0.65] as [number, number, number, number],
          confidence: 0.89,
          class: 'person'
        },
        {
          bbox: [0.7, 0.3, 0.85, 0.65] as [number, number, number, number],
          confidence: 0.84,
          class: 'person'
        }
      ];

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300));
      
      const processingTime = (Date.now() - startTime) / 1000;
      
      const detectionData = {
        filename: req.file.originalname,
        originalUrl: `/uploads/${req.file.filename}`,
        processedUrl: `/uploads/${req.file.filename}`, // In real implementation, this would be the processed image
        detections: mockDetections,
        processingTime,
        totalPedestrians: mockDetections.length,
      };

      const result = await storage.createDetectionResult(detectionData);
      res.json(result);
    } catch (error) {
      console.error('Detection error:', error);
      res.status(500).json({ message: 'Failed to process image' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
