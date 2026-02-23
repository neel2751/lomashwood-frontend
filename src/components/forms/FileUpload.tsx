"use client";

import { Upload, X, File, Image as ImageIcon, FileText, AlertCircle, CheckCircle2 } from "lucide-react";
import { useState, useRef, useCallback } from "react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  accept?: string;
  maxSize?: number; // in MB
  maxFiles?: number;
  multiple?: boolean;
  disabled?: boolean;
  value?: File[];
  onChange?: (files: File[]) => void;
  onError?: (error: string) => void;
  className?: string;
  showPreview?: boolean;
  uploadEndpoint?: string;
  autoUpload?: boolean;
}

interface UploadedFile {
  file: File;
  preview?: string;
  progress?: number;
  status: "pending" | "uploading" | "success" | "error";
  error?: string;
  url?: string;
}

const ACCEPTED_FILE_TYPES = {
  image: "image/jpeg,image/jpg,image/png,image/webp,image/gif",
  document: ".pdf,.doc,.docx,.txt",
  spreadsheet: ".xls,.xlsx,.csv",
  all: "*",
};

const FILE_SIZE_LIMIT = {
  small: 5,
  medium: 10,
  large: 50, 
};

export default function FileUpload({
  accept = ACCEPTED_FILE_TYPES.all,
  maxSize = FILE_SIZE_LIMIT.small,
  maxFiles = 1,
  multiple = false,
  disabled = false,
  onChange,
  onError,
  className,
  showPreview = true,
  uploadEndpoint,
  autoUpload = false,
}: FileUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon className="h-5 w-5" />;
    }
    if (file.type.includes("pdf") || file.type.includes("document")) {
      return <FileText className="h-5 w-5" />;
    }
    return <File className="h-5 w-5" />;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const validateFile = (file: File): string | null => {
    const maxSizeBytes = maxSize * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return `File size exceeds ${maxSize}MB limit`;
    }

    if (accept !== "*" && accept !== ACCEPTED_FILE_TYPES.all) {
      const acceptedTypes = accept.split(",").map((type) => type.trim());
      const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;
      const mimeType = file.type;

      const isValid = acceptedTypes.some((type) => {
        if (type.startsWith(".")) {
          return fileExtension === type.toLowerCase();
        }
        if (type.includes("/*")) {
          const baseType = type.split("/")[0];
          return mimeType.startsWith(baseType);
        }
        return mimeType === type;
      });

      if (!isValid) {
        return `File type not accepted. Accepted types: ${accept}`;
      }
    }

    return null;
  };

  const createFilePreview = (file: File): Promise<string | undefined> => {
    return new Promise((resolve) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = () => resolve(undefined);
        reader.readAsDataURL(file);
      } else {
        resolve(undefined);
      }
    });
  };

  const uploadFile = async (uploadedFile: UploadedFile): Promise<void> => {
    if (!uploadEndpoint) return;

    const formData = new FormData();
    formData.append("file", uploadedFile.file);

    try {
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.file === uploadedFile.file
              ? { ...f, progress, status: "uploading" }
              : f
          )
        );
      }

      const response = await fetch(uploadEndpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();

      setUploadedFiles((prev) =>
        prev.map((f) =>
          f.file === uploadedFile.file
            ? { ...f, status: "success", url: data.url }
            : f
        )
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Upload failed";
      setUploadedFiles((prev) =>
        prev.map((f) =>
          f.file === uploadedFile.file
            ? { ...f, status: "error", error: errorMessage }
            : f
        )
      );
      onError?.(errorMessage);
    }
  };

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;

      const fileArray = Array.from(files);

      if (uploadedFiles.length + fileArray.length > maxFiles) {
        const error = `Maximum ${maxFiles} file${maxFiles > 1 ? "s" : ""} allowed`;
        onError?.(error);
        return;
      }

      const validFiles: UploadedFile[] = [];

      for (const file of fileArray) {
        const validationError = validateFile(file);
        if (validationError) {
          onError?.(validationError);
          continue;
        }

        const preview = await createFilePreview(file);
        const uploadedFile: UploadedFile = {
          file,
          preview,
          status: autoUpload ? "pending" : "success",
          progress: 0,
        };

        validFiles.push(uploadedFile);
      }

      const newFiles = [...uploadedFiles, ...validFiles];
      setUploadedFiles(newFiles);
      onChange?.(newFiles.map((f) => f.file));

      if (autoUpload && uploadEndpoint) {
        validFiles.forEach((file) => uploadFile(file));
      }
    },
    [uploadedFiles, maxFiles, autoUpload, uploadEndpoint, onChange, onError]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    onChange?.(newFiles.map((f) => f.file));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openFileDialog = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const canAddMore = uploadedFiles.length < maxFiles;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Upload Area */}
      {canAddMore && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={openFileDialog}
          className={cn(
            "relative border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50 hover:bg-accent/50",
            disabled && "opacity-50 cursor-not-allowed hover:border-muted-foreground/25"
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleFileInputChange}
            disabled={disabled}
            className="hidden"
          />

          <div className="flex flex-col items-center justify-center gap-3 text-center">
            <div className="p-3 rounded-full bg-primary/10">
              <Upload className="h-6 w-6 text-primary" />
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium">
                {isDragging ? "Drop files here" : "Click to upload or drag and drop"}
              </p>
              <p className="text-xs text-muted-foreground">
                {accept === "*" || accept === ACCEPTED_FILE_TYPES.all
                  ? "Any file type"
                  : accept.includes("image")
                  ? "Images only"
                  : "Documents only"}{" "}
                (Max {maxSize}MB)
                {maxFiles > 1 && ` • Up to ${maxFiles} files`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* File List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          {uploadedFiles.map((uploadedFile, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg border bg-card"
            >
              {/* Preview or Icon */}
              {showPreview && uploadedFile.preview ? (
                <div className="flex-shrink-0 w-12 h-12 rounded overflow-hidden bg-muted">
                  <img
                    src={uploadedFile.preview}
                    alt={uploadedFile.file.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex-shrink-0 w-12 h-12 rounded bg-muted flex items-center justify-center text-muted-foreground">
                  {getFileIcon(uploadedFile.file)}
                </div>
              )}

              {/* File Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {uploadedFile.file.name}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(uploadedFile.file.size)}
                  </p>

                  {/* Status Badge */}
                  {uploadedFile.status === "uploading" && (
                    <span className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1">
                      <span className="inline-block w-1 h-1 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                      Uploading...
                    </span>
                  )}
                  {uploadedFile.status === "success" && !autoUpload && (
                    <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Ready
                    </span>
                  )}
                  {uploadedFile.status === "success" && autoUpload && (
                    <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Uploaded
                    </span>
                  )}
                  {uploadedFile.status === "error" && (
                    <span className="text-xs text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Failed
                    </span>
                  )}
                </div>

                {/* Progress Bar */}
                {uploadedFile.status === "uploading" && uploadedFile.progress !== undefined && (
                  <Progress value={uploadedFile.progress} className="h-1 mt-2" />
                )}

                {/* Error Message */}
                {uploadedFile.error && (
                  <p className="text-xs text-destructive mt-1">{uploadedFile.error}</p>
                )}
              </div>

              {/* Remove Button */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                disabled={disabled || uploadedFile.status === "uploading"}
                className="flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* File Count Info */}
      {maxFiles > 1 && uploadedFiles.length > 0 && (
        <p className="text-xs text-muted-foreground text-center">
          {uploadedFiles.length} of {maxFiles} file{maxFiles > 1 ? "s" : ""} selected
        </p>
      )}
    </div>
  );
}

export function ImageUpload(props: Omit<FileUploadProps, "accept">) {
  return <FileUpload {...props} accept={ACCEPTED_FILE_TYPES.image} />;
}

export function DocumentUpload(props: Omit<FileUploadProps, "accept">) {
  return <FileUpload {...props} accept={ACCEPTED_FILE_TYPES.document} />;
}

export function SpreadsheetUpload(props: Omit<FileUploadProps, "accept">) {
  return <FileUpload {...props} accept={ACCEPTED_FILE_TYPES.spreadsheet} />;
}