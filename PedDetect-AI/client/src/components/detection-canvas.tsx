import { useEffect, useRef } from "react";

interface DetectionCanvasProps {
  result: {
    id: string;
    filename: string;
    originalUrl: string;
    detections: Array<{
      bbox: [number, number, number, number];
      confidence: number;
      class: string;
    }>;
    processingTime: number;
    totalPedestrians: number;
  };
}

export function DetectionCanvas({ result }: DetectionCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    const canvas = canvasRef.current;
    
    if (!image || !canvas) return;

    const drawDetections = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size to match image
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw bounding boxes
      result.detections.forEach((detection) => {
        const [x, y, width, height] = detection.bbox;
        
        // Convert normalized coordinates to pixel coordinates
        const pixelX = x * canvas.width;
        const pixelY = y * canvas.height;
        const pixelWidth = width * canvas.width;
        const pixelHeight = height * canvas.height;

        // Draw bounding box
        ctx.strokeStyle = 'hsl(158, 64%, 52%)'; // secondary color
        ctx.lineWidth = 2;
        ctx.strokeRect(pixelX, pixelY, pixelWidth, pixelHeight);

        // Draw confidence background
        ctx.fillStyle = 'hsl(158, 64%, 52%)'; // secondary color
        const badgeWidth = 60;
        const badgeHeight = 20;
        ctx.fillRect(pixelX - 2, pixelY - 22, badgeWidth, badgeHeight);

        // Draw confidence text
        ctx.fillStyle = 'hsl(220, 25%, 8%)'; // card background
        ctx.font = '600 12px Inter, system-ui, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(
          `${Math.round(detection.confidence * 100)}%`,
          pixelX + 4,
          pixelY - 8
        );
      });
    };

    if (image.complete) {
      drawDetections();
    } else {
      image.onload = drawDetections;
    }
  }, [result]);

  return (
    <div className="space-y-3" data-testid={`detection-result-${result.id}`}>
      <div className="relative inline-block">
        <img
          ref={imageRef}
          src={result.originalUrl}
          alt={result.filename}
          className="w-full h-48 object-cover rounded-lg"
          crossOrigin="anonymous"
          data-testid={`img-detection-${result.id}`}
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-48 object-cover rounded-lg pointer-events-none"
          data-testid={`canvas-detection-${result.id}`}
        />
      </div>
      <div className="text-sm text-muted-foreground">
        <p data-testid={`text-detected-count-${result.id}`}>
          <strong>Detected:</strong> {result.totalPedestrians} pedestrians
        </p>
        <p data-testid={`text-processing-time-${result.id}`}>
          <strong>Processing time:</strong> {result.processingTime.toFixed(2)}s
        </p>
      </div>
    </div>
  );
}
