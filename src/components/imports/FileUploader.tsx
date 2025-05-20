
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileUp, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
}

export const FileUploader = ({ onFileUpload }: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
    }
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors",
          isDragging ? "border-pjiae-blue bg-pjiae-blue/10" : "border-gray-300 hover:border-gray-400",
          "flex flex-col items-center justify-center"
        )}
        onClick={openFileDialog}
      >
        <FileUp 
          className={cn(
            "w-12 h-12 mb-4",
            isDragging ? "text-pjiae-blue" : "text-gray-400"
          )} 
        />
        <h3 className="text-lg font-medium mb-2">Drag & Drop Your File</h3>
        <p className="text-sm text-gray-500 mb-4">
          or click to browse your files
        </p>
        <p className="text-xs text-gray-400">
          Accepted formats: .csv, .json, .xml
        </p>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".csv,.json,.xml"
          onChange={handleFileInputChange}
        />
      </div>

      {selectedFile && (
        <div className="mt-4">
          <div className="flex items-center p-3 bg-gray-50 border rounded-md">
            <FileText className="text-pjiae-blue mr-3 h-6 w-6" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">
                {selectedFile.name}
              </p>
              <p className="text-xs text-gray-500">
                {(selectedFile.size / 1024).toFixed(2)} KB • {selectedFile.type || "Unknown type"}
              </p>
            </div>
            <Button onClick={handleUpload}>
              Upload
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
