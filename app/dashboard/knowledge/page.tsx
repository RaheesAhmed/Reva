"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Upload, Trash2, FileText, Loader2, AlertCircle, Calculator } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileInfo {
  file_id: string;
  filename: string;
  status: string;
}

export default function KnowledgePage() {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [interpreterFiles, setInterpreterFiles] = useState<FileInfo[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isInterpreterUploading, setIsInterpreterUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isInterpreterLoading, setIsInterpreterLoading] = useState(true);

  useEffect(() => {
    fetchFiles();
    fetchInterpreterFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await fetch("/api/assistants/files");
      if (!response.ok) {
        throw new Error("Failed to fetch files");
      }
      const data = await response.json();
      setFiles(data);
    } catch (error) {
      console.error("Error fetching files:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch files",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchInterpreterFiles = async () => {
    try {
      const response = await fetch("/api/assistants/files-anaylsis");
      if (!response.ok) {
        throw new Error("Failed to fetch interpreter files");
      }
      const data = await response.json();
      setInterpreterFiles(data);
    } catch (error) {
      console.error("Error fetching interpreter files:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch interpreter files",
      });
    } finally {
      setIsInterpreterLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      toast({
        title: "Uploading file...",
        description: file.name,
      });

      const response = await fetch("/api/assistants/files", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      toast({
        title: "Success",
        description: "File uploaded successfully",
      });

      fetchFiles(); // Refresh file list
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload file",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    try {
      const response = await fetch("/api/assistants/files", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete file");
      }

      toast({
        title: "Success",
        description: "File deleted successfully",
      });

      fetchFiles(); // Refresh file list
    } catch (error) {
      console.error("Error deleting file:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete file",
      });
    }
  };

  const handleInterpreterFileUpload = async (file: File) => {
    setIsInterpreterUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      toast({
        title: "Uploading analysis file...",
        description: file.name,
      });

      const response = await fetch("/api/assistants/files-anaylsis", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      toast({
        title: "Success",
        description: "Analysis file uploaded successfully",
      });

      fetchInterpreterFiles();
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload analysis file",
      });
    } finally {
      setIsInterpreterUploading(false);
    }
  };

  const handleDeleteInterpreterFile = async (fileId: string) => {
    try {
      const response = await fetch("/api/assistants/files-anaylsis", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete file");
      }

      toast({
        title: "Success",
        description: "Analysis file deleted successfully",
      });

      fetchInterpreterFiles();
    } catch (error) {
      console.error("Error deleting file:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete analysis file",
      });
    }
  };

  return (
    <div className="space-y-8 p-8">
      {/* Code Interpreter Files Section */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Analysis Files</h1>
            <p className="text-sm text-neutral-400 mt-1">
              Upload data files for real estate analysis and calculations (CSV, Excel, etc.)
            </p>
          </div>
        </div>

        <Card className="p-6 bg-neutral-800/50 border-neutral-700">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calculator className="h-4 w-4 text-neutral-400" />
              <p className="text-sm text-neutral-400">
                Supported formats: CSV, Excel, JSON, and other data files for analysis
              </p>
            </div>

            <label htmlFor="interpreter-file-upload" className="cursor-pointer block">
              <div
                className={cn(
                  "border-2 border-dashed border-neutral-700 rounded-lg p-8",
                  "hover:border-neutral-600 transition-colors duration-200",
                  "flex flex-col items-center justify-center gap-2",
                  isInterpreterUploading && "opacity-50"
                )}
              >
                {isInterpreterUploading ? (
                  <Loader2 className="h-8 w-8 text-neutral-400 animate-spin" />
                ) : (
                  <Upload className="h-8 w-8 text-neutral-400" />
                )}
                <p className="text-sm text-neutral-400">
                  {isInterpreterUploading
                    ? "Uploading..."
                    : "Drop analysis files here or click to upload"}
                </p>
              </div>
            </label>
            <input
              id="interpreter-file-upload"
              type="file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleInterpreterFileUpload(file);
              }}
              accept=".csv,.xlsx,.xls,.json,.txt"
              disabled={isInterpreterUploading}
            />
          </div>
        </Card>

        <div className="space-y-4">
          <h2 className="text-lg font-medium">Uploaded Analysis Files</h2>
          <Card className="divide-y divide-neutral-800 bg-neutral-800/50 border-neutral-700">
            {isInterpreterLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
              </div>
            ) : interpreterFiles.length === 0 ? (
              <div className="text-center py-8 text-neutral-400">
                No analysis files uploaded yet
              </div>
            ) : (
              interpreterFiles.map((file) => (
                <div
                  key={file.file_id}
                  className="flex items-center justify-between p-4 group hover:bg-neutral-800/80"
                >
                  <div className="flex items-center gap-3">
                    <Calculator className="h-5 w-5 text-neutral-400" />
                    <div>
                      <p className="text-sm font-medium text-neutral-200">
                        {file.filename}
                      </p>
                      <p className="text-xs text-neutral-400">
                        Ready for analysis
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="bg-white/10 opacity-0 group-hover:opacity-100 hover:bg-red-500/10 hover:text-red-400"
                    onClick={() => handleDeleteInterpreterFile(file.file_id)}
                  >
                    <Trash2 className="h-4 w-4 text-white" />
                  </Button>
                </div>
              ))
            )}
          </Card>
        </div>
      </div>

      {/* Existing Knowledge Base Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Knowledge Base</h1>
          <p className="text-sm text-neutral-400 mt-1">
            Upload documents to enhance the assistant's knowledge
          </p>
        </div>
      </div>

      {/* Upload Area */}
      <Card className="p-6 bg-neutral-800/50 border-neutral-700">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-neutral-400" />
            <p className="text-sm text-neutral-400">
              Supported formats: PDF, DOC, DOCX, TXT, CSV
            </p>
          </div>

          <label htmlFor="file-upload" className="cursor-pointer block">
            <div
              className={cn(
                "border-2 border-dashed border-neutral-700 rounded-lg p-8",
                "hover:border-neutral-600 transition-colors duration-200",
                "flex flex-col items-center justify-center gap-2",
                isUploading && "opacity-50"
              )}
            >
              {isUploading ? (
                <Loader2 className="h-8 w-8 text-neutral-400 animate-spin" />
              ) : (
                <Upload className="h-8 w-8 text-neutral-400" />
              )}
              <p className="text-sm text-neutral-400">
                {isUploading
                  ? "Uploading..."
                  : "Drop files here or click to upload"}
              </p>
            </div>
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(file);
            }}
            accept=".pdf,.doc,.docx,.txt,.csv"
            disabled={isUploading}
          />
        </div>
      </Card>

      {/* File List */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Uploaded Files</h2>
        <Card className="divide-y divide-neutral-800 bg-neutral-800/50 border-neutral-700">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
            </div>
          ) : files.length === 0 ? (
            <div className="text-center py-8 text-neutral-400">
              No files uploaded yet
            </div>
          ) : (
            files.map((file) => (
              <div
                key={file.file_id}
                className="flex items-center justify-between p-4 group hover:bg-neutral-800/80"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-neutral-400" />
                  <div>
                    <p className="text-sm font-medium text-neutral-200">
                      {file.filename}
                    </p>
                    <p className="text-xs text-neutral-400">
                      {file.status === "processed"
                        ? "Ready to use"
                        : "Processing"}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "text-xs px-2 py-0.5 rounded-full",
                      file.status === "processed"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    )}
                  >
                    {file.status}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 hover:bg-red-500/10 hover:text-red-400"
                  onClick={() => handleDeleteFile(file.file_id)}
                >
                  <Trash2 className="h-4 w-4 text-white" />
                </Button>
              </div>
            ))
          )}
        </Card>
      </div>
    </div>
  );
}
