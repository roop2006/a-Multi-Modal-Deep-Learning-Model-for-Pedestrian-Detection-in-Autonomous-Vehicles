import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, AlertTriangle, Clock } from "lucide-react";

interface MetricsPanelProps {
  metrics?: {
    accuracy: number;
    precision: number;
    recall: number;
    avgProcessingTime: number;
    totalProcessed: number;
    highRiskDetections: number;
    recentDetections: number;
  };
}

export function MetricsPanel({ metrics }: MetricsPanelProps) {
  if (!metrics) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-8 bg-muted rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <Card className="bg-gradient-to-br from-card to-card/80 border-border">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="text-accent mr-2" size={20} />
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Accuracy</span>
            <span className="text-lg font-bold text-secondary" data-testid="metric-accuracy">
              {metrics.accuracy.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-secondary h-2 rounded-full transition-all duration-500" 
              style={{ width: `${metrics.accuracy}%` }}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Precision</span>
            <span className="text-lg font-bold text-primary" data-testid="metric-precision">
              {metrics.precision.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500" 
              style={{ width: `${metrics.precision}%` }}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Recall</span>
            <span className="text-lg font-bold text-accent" data-testid="metric-recall">
              {metrics.recall.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-accent h-2 rounded-full transition-all duration-500" 
              style={{ width: `${metrics.recall}%` }}
            />
          </div>
          
          <div className="pt-4 border-t border-border">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Avg. Processing Time</span>
              <span className="text-sm font-medium text-foreground" data-testid="metric-avg-time">
                {metrics.avgProcessingTime.toFixed(2)}s
              </span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-muted-foreground">Images Processed</span>
              <span className="text-sm font-medium text-foreground" data-testid="metric-total-processed">
                {metrics.totalProcessed.toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detection Statistics */}
      <Card className="bg-gradient-to-br from-card to-card/80 border-border">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="text-secondary mr-2" size={20} />
            Detection Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
            <div className="flex items-center">
              <Users className="text-secondary mr-2" size={16} />
              <span className="text-sm text-foreground">Total Pedestrians</span>
            </div>
            <span className="font-bold text-secondary" data-testid="stat-total-pedestrians">
              5,832
            </span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
            <div className="flex items-center">
              <AlertTriangle className="text-yellow-500 mr-2" size={16} />
              <span className="text-sm text-foreground">High Risk</span>
            </div>
            <span className="font-bold text-yellow-500" data-testid="stat-high-risk">
              {metrics.highRiskDetections}
            </span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
            <div className="flex items-center">
              <Clock className="text-accent mr-2" size={16} />
              <span className="text-sm text-foreground">Last 24h</span>
            </div>
            <span className="font-bold text-accent" data-testid="stat-recent">
              {metrics.recentDetections}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
