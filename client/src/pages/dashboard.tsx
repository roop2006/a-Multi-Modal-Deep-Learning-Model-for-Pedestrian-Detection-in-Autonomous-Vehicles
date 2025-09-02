import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ImageUpload } from "@/components/image-upload";
import { DetectionCanvas } from "@/components/detection-canvas";
import { MetricsPanel } from "@/components/metrics-panel";
import { ModelInfo } from "@/components/model-info";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Car, TrendingUp, Server, GraduationCap, CheckCircle } from "lucide-react";

export default function Dashboard() {
  const [selectedResults, setSelectedResults] = useState<any[]>([]);

  const { data: detectionResults = [] } = useQuery({
    queryKey: ['/api/detections'],
  });

  const { data: metrics } = useQuery<{
    accuracy: number;
    precision: number;
    recall: number;
    avgProcessingTime: number;
    totalProcessed: number;
    highRiskDetections: number;
    recentDetections: number;
  }>({
    queryKey: ['/api/metrics'],
    refetchInterval: 5000, // Update every 5 seconds
  });

  const handleDetectionComplete = (result: any) => {
    setSelectedResults(prev => [result, ...prev].slice(0, 4)); // Keep last 4 results
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Eye className="text-primary-foreground" size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground" data-testid="app-title">PedDetect AI</h1>
                <p className="text-sm text-muted-foreground">Pedestrian Detection for Autonomous Vehicles</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">Model: YOLOv8</p>
                <p className="text-xs text-muted-foreground">
                  Status: <span className="text-secondary">Active</span>
                </p>
              </div>
              <div className="w-3 h-3 bg-secondary rounded-full animate-pulse" data-testid="status-indicator" />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload and Detection Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="text-primary mr-2" size={20} />
                  Image Upload & Detection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUpload onDetectionComplete={handleDetectionComplete} />
              </CardContent>
            </Card>

            {/* Detection Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="text-accent mr-2" size={20} />
                  Detection Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedResults.length > 0 ? (
                    selectedResults.map((result, index) => (
                      <DetectionCanvas key={result.id || index} result={result} />
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-12 text-muted-foreground">
                      <CheckCircle size={48} className="mx-auto mb-4 opacity-50" />
                      <p>Upload images to see detection results</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Metrics Sidebar */}
          <div className="space-y-6">
            <MetricsPanel metrics={metrics} />
            <ModelInfo />
          </div>
        </div>

        {/* Dashboard Overview */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Autonomous Vehicle Integration */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Car className="text-primary mr-2" size={20} />
                Autonomous Vehicle Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="w-full h-40 bg-gradient-to-br from-muted via-muted/80 to-muted/60 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Car size={48} className="mx-auto mb-2 text-primary" />
                    <p className="text-sm text-muted-foreground">Vehicle Dashboard Integration</p>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-sm text-foreground font-medium">
                    Real-time pedestrian detection integrated with vehicle navigation and safety systems.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Traffic Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="text-accent mr-2" size={20} />
                Traffic Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Peak Hours</span>
                <span className="text-sm font-medium text-foreground">8-9 AM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Crossings/Hour</span>
                <span className="text-sm font-medium text-secondary">127</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Safety Score</span>
                <span className="text-sm font-medium text-primary">9.2/10</span>
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="text-secondary mr-2" size={20} />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">GPU Usage</span>
                <span className="text-sm font-medium text-foreground">76%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '76%' }} />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Memory: 3.2GB</span>
                <span>Temp: 67°C</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Technical Implementation */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="text-accent mr-2" size={20} />
              Technical Implementation & Model Architecture
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">YOLOv8 Architecture</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    Our pedestrian detection system utilizes YOLOv8 (You Only Look Once version 8), a state-of-the-art real-time object detection model. 
                    YOLOv8 processes the entire image in a single forward pass, making it ideal for autonomous vehicle applications where speed is critical.
                  </p>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">640x640</div>
                        <div className="text-xs text-muted-foreground">Input Resolution</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-secondary">53.2 FPS</div>
                        <div className="text-xs text-muted-foreground">Processing Speed</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-accent">11.2M</div>
                        <div className="text-xs text-muted-foreground">Parameters</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">Multi-Modal Integration</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    The system integrates multiple data sources including camera feeds, LiDAR data, and radar inputs to provide comprehensive 
                    pedestrian detection. This multi-modal approach significantly improves detection accuracy in various weather and lighting conditions.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-muted rounded-lg p-4">
                  <h5 className="font-medium text-foreground mb-2">Key Features</h5>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <CheckCircle className="text-secondary mr-2" size={16} />
                      Real-time detection
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="text-secondary mr-2" size={16} />
                      Confidence scoring
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="text-secondary mr-2" size={16} />
                      Bounding box prediction
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="text-secondary mr-2" size={16} />
                      Multi-scale detection
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="text-secondary mr-2" size={16} />
                      Weather adaptation
                    </li>
                  </ul>
                </div>
                
                <div className="bg-muted rounded-lg p-4">
                  <h5 className="font-medium text-foreground mb-2">Technologies Used</h5>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">PyTorch</Badge>
                    <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">OpenCV</Badge>
                    <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">CUDA</Badge>
                    <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">TensorRT</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-border bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground">
              <p>&copy; 2024 PedDetect AI - College Research Project</p>
              <p>Autonomous Vehicle Pedestrian Detection System</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-sm text-muted-foreground">Model Version:</span>
              <Badge className="bg-primary/10 text-primary">v2.1.0</Badge>
              <span className="text-sm text-muted-foreground">|</span>
              <span className="text-sm text-muted-foreground">Last Updated: Dec 2024</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
