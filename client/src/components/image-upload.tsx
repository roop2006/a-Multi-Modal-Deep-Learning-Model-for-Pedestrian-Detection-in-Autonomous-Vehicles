import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload, FolderOpen, Trash2, Play, Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface ImageUploadProps {
  onDetectionComplete?: (result: any) => void;
}

export function ImageUpload({ onDetectionComplete }: ImageUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const detectMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await apiRequest('POST', '/api/detect', formData);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Detection Complete",
        description: `Found ${data.totalPedestrians} pedestrians in ${data.processingTime.toFixed(2)}s`,
      });
      onDetectionComplete?.(data);
      queryClient.invalidateQueries({ queryKey: ['/api/detections'] });
      queryClient.invalidateQueries({ queryKey: ['/api/metrics'] });
    },
    onError: (error: any) => {
      toast({
        title: "Detection Failed",
        description: error.message || "Failed to process image",
        variant: "destructive",
      });
    },
  });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter(file => 
      file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024
    );
    
    if (imageFiles.length !== files.length) {
      toast({
        title: "Invalid Files",
        description: "Only image files under 10MB are allowed",
        variant: "destructive",
      });
    }
    
    setSelectedFiles(prev => [...prev, ...imageFiles].slice(0, 5)); // Limit to 5 files
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleStartDetection = () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No Files Selected",
        description: "Please select images to process",
        variant: "destructive",
      });
      return;
    }

    // Process files one by one
    selectedFiles.forEach(file => {
      detectMutation.mutate(file);
    });
  };

  const handleClear = () => {
    setSelectedFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
          dragOver 
            ? 'border-primary bg-primary/5' 
            : 'border-border hover:border-primary hover:bg-primary/5'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
        data-testid="upload-zone"
      >
        <Upload className="mx-auto mb-4 text-muted-foreground" size={48} />
        <p className="text-foreground font-medium mb-2">Drag & drop images here</p>
        <p className="text-muted-foreground text-sm mb-4">or click to browse files</p>
        <Button 
          variant="default" 
          onClick={(e) => {
            e.stopPropagation();
            handleBrowseClick();
          }}
          data-testid="button-browse"
        >
          <FolderOpen className="mr-2" size={16} />
          Browse Files
        </Button>
        <p className="text-xs text-muted-foreground mt-2">Supports: JPG, PNG, WebP (Max 10MB)</p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        data-testid="input-file"
      />

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-foreground">Selected Files ({selectedFiles.length})</h4>
          <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-muted rounded p-2">
                <span className="text-sm text-foreground truncate">{file.name}</span>
                <span className="text-xs text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(1)}MB
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button 
          className="flex-1 bg-secondary hover:bg-secondary/90" 
          onClick={handleStartDetection}
          disabled={selectedFiles.length === 0 || detectMutation.isPending}
          data-testid="button-detect"
        >
          {detectMutation.isPending ? (
            <Loader2 className="mr-2 animate-spin" size={16} />
          ) : (
            <Play className="mr-2" size={16} />
          )}
          {detectMutation.isPending ? 'Processing...' : 'Start Detection'}
        </Button>
        <Button 
          variant="outline" 
          onClick={handleClear}
          disabled={detectMutation.isPending}
          data-testid="button-clear"
        >
          <Trash2 className="mr-2" size={16} />
          Clear
        </Button>
      </div>
    </div>
  );
}
