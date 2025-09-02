# PedDetect AI - Pedestrian Detection System

A multi-modal deep learning system for pedestrian detection in autonomous vehicles. Built with React, TypeScript, and Express.js with real-time YOLOv8 simulation.

## Features

- 🚗 **Autonomous Vehicle Integration** - Real-time pedestrian detection for vehicle safety
- 🧠 **YOLOv8 Simulation** - Mock AI detection with realistic bounding boxes and confidence scores
- 📊 **Performance Analytics** - Real-time metrics tracking (accuracy, precision, recall)
- 📈 **Dynamic System Monitoring** - GPU usage, memory consumption, temperature tracking
- 🚦 **Traffic Analysis** - Live crossings/hour and safety scoring
- 📱 **Responsive UI** - Professional dark-themed dashboard
- 🔄 **Real-time Updates** - All metrics update instantly with new uploads

## Project Structure

```
PedDetect-AI/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # UI Components
│   │   ├── pages/         # Page Components
│   │   ├── hooks/         # Custom Hooks
│   │   └── lib/           # Utilities
│   └── index.html         # HTML Template
├── server/                # Express Backend
│   ├── routes.ts          # API Routes
│   ├── storage.ts         # Data Storage
│   └── index.ts           # Server Entry
├── shared/                # Shared Types
│   └── schema.ts          # Database Schema
└── uploads/               # Image Storage (auto-created)
```

## Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Access Application**
   - Open http://localhost:5000 in your browser
   - The application serves both frontend and backend on the same port

## Usage

1. **Upload Images**
   - Drag & drop or click to browse image files
   - Supports JPG, PNG, WebP formats (max 10MB)

2. **View Detection Results**
   - Real-time pedestrian detection with bounding boxes
   - Confidence scores for each detection
   - Processing time tracking

3. **Monitor Performance**
   - Live system metrics (accuracy, precision, recall)
   - Dynamic traffic analysis
   - System resource monitoring

## Technical Implementation

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Express.js + TypeScript + Multer for file uploads  
- **UI Components**: Radix UI + shadcn/ui design system
- **State Management**: TanStack React Query
- **Database**: In-memory storage with PostgreSQL schema ready
- **File Storage**: Local filesystem with configurable limits

## API Endpoints

- `GET /api/metrics` - System performance metrics
- `GET /api/detections` - All detection results
- `GET /api/detections/:id` - Specific detection result
- `POST /api/detect` - Upload and process image
- `GET /uploads/:filename` - Serve uploaded images

## College Presentation Ready

This system is designed for academic presentations with:
- Professional UI suitable for demonstrations
- Real-time metrics that update during presentations
- Technical architecture explanations built into the interface
- Realistic AI simulation perfect for showcasing concepts
- Comprehensive performance analytics

## Development

The system uses:
- Hot module replacement for fast development
- TypeScript for type safety
- ESLint + Prettier for code quality
- Real-time error reporting

---

Built for autonomous vehicle safety research and academic presentations.