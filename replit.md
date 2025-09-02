# Overview

PedDetect AI is a pedestrian detection system designed for autonomous vehicles. It's a full-stack web application that allows users to upload images and perform AI-powered pedestrian detection using YOLOv8. The system provides real-time performance metrics, visual detection results with bounding boxes, and comprehensive system analytics for monitoring detection accuracy and processing performance.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack React Query for server state and caching
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **File Uploads**: Multer middleware for handling image uploads with 10MB limit
- **Storage**: In-memory storage implementation with interface for easy database migration
- **API Design**: RESTful API with structured error handling and request logging

## Data Storage
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema**: Two main tables - detection_results and system_metrics
- **File Storage**: Local filesystem for uploaded images (uploads directory)
- **Migrations**: Drizzle Kit for database schema management

## Development Tools
- **Build System**: Vite for fast development and optimized production builds
- **Type Safety**: Shared TypeScript types between frontend and backend
- **Database Tools**: Drizzle for schema definition and migrations
- **Development Server**: Hot module replacement with Vite middleware integration

## Authentication & Security
- **File Validation**: Image type restrictions (JPEG, PNG, WebP only)
- **CORS**: Configured for cross-origin requests
- **Session Management**: Express session handling with PostgreSQL session store
- **Input Validation**: Zod schemas for API request validation

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting (@neondatabase/serverless)
- **Connection**: Uses DATABASE_URL environment variable for database connectivity

## UI Component Libraries
- **Radix UI**: Comprehensive set of accessible UI primitives
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Utility for managing component variants

## Development & Build Tools
- **Vite**: Fast build tool with HMR support
- **TypeScript**: Type safety across the entire application
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing with autoprefixer

## Data Management
- **TanStack React Query**: Server state management and caching
- **Drizzle ORM**: Type-safe database operations
- **Zod**: Runtime type validation and schema definition

## File Processing
- **Multer**: Express middleware for handling multipart/form-data
- **File System**: Node.js fs module for file operations

## Replit Integration
- **Runtime Error Overlay**: Development error handling
- **Cartographer**: Replit-specific development tooling
- **Dev Banner**: Replit environment indicators