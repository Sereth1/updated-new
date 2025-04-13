import { useState, useRef, DragEvent } from "react";
import clsx from "clsx";
import gsap from "gsap";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  acceptedTypes?: string[];
  maxSize?: number; // in bytes
}

export const FileUpload = ({
  onFileSelect,
  acceptedTypes = [".pdf", ".txt", ".doc", ".docx"],
  maxSize = 10 * 1024 * 1024, // 10MB default
}: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);

    if (dropZoneRef.current) {
      gsap.to(dropZoneRef.current, {
        scale: 1.02,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (dropZoneRef.current) {
      gsap.to(dropZoneRef.current, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  const validateFile = (file: File): boolean => {
    setError(null);

    // Check file size
    if (file.size > maxSize) {
      setError(`File size must be less than ${maxSize / 1024 / 1024}MB`);
      return false;
    }

    // Check file type
    const fileType = `.${file.name.split(".").pop()?.toLowerCase()}`;
    if (!acceptedTypes.includes(fileType)) {
      setError(`File type must be one of: ${acceptedTypes.join(", ")}`);
      return false;
    }

    return true;
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (dropZoneRef.current) {
      gsap.to(dropZoneRef.current, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    }

    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      onFileSelect(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      onFileSelect(file);
    }
  };

  return (
    <div className="relative">
      <div
        ref={dropZoneRef}
        className={clsx(
          "border-2 border-dashed rounded-lg p-8 transition-colors",
          isDragging
            ? "border-white/40 bg-white/5"
            : "border-white/20 hover:border-white/30",
          "cursor-pointer"
        )}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="flex flex-col items-center justify-center text-center">
          <svg
            className="w-12 h-12 text-white/50 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="text-lg text-white/90 font-medium">
            Drop your file here, or click to select
          </p>
          <p className="mt-2 text-sm text-white/60">
            Supports: {acceptedTypes.join(", ")}
          </p>
          <p className="text-sm text-white/60">
            Max size: {maxSize / 1024 / 1024}MB
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-200">
          {error}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept={acceptedTypes.join(",")}
        onChange={handleFileSelect}
      />
    </div>
  );
};
