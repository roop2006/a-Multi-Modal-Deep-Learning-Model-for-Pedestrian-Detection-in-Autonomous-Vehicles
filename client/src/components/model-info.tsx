import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain } from "lucide-react";

export function ModelInfo() {
  const modelSpecs = [
    { label: "Architecture", value: "YOLOv8" },
    { label: "Input Size", value: "640x640" },
    { label: "Framework", value: "PyTorch" },
    { label: "Dataset", value: "COCO + Custom" },
    { label: "Parameters", value: "11.2M" },
  ];

  const technologies = [
    { name: "PyTorch", color: "primary" },
    { name: "OpenCV", color: "secondary" },
    { name: "CUDA", color: "accent" },
    { name: "TensorRT", color: "yellow" },
  ];

  return (
    <Card className="bg-gradient-to-br from-card to-card/80 border-border">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="text-primary mr-2" size={20} />
          Model Info
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3 text-sm">
          {modelSpecs.map((spec, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-muted-foreground">{spec.label}</span>
              <span className="text-foreground font-medium" data-testid={`model-${spec.label.toLowerCase().replace(' ', '-')}`}>
                {spec.value}
              </span>
            </div>
          ))}
        </div>
        
        <div className="pt-4 border-t border-border">
          <h5 className="font-medium text-foreground mb-2">Technologies</h5>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className={`${
                  tech.color === 'primary' ? 'bg-primary/10 text-primary border-primary/20' :
                  tech.color === 'secondary' ? 'bg-secondary/10 text-secondary border-secondary/20' :
                  tech.color === 'accent' ? 'bg-accent/10 text-accent border-accent/20' :
                  'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                }`}
                data-testid={`tech-${tech.name.toLowerCase()}`}
              >
                {tech.name}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
