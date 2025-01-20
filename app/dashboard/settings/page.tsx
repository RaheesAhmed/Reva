"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Settings as SettingsIcon, Loader2 } from "lucide-react";

interface AssistantData {
  id: string;
  instructions: string;
}

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [assistantData, setAssistantData] = useState<AssistantData>({
    id: "",
    instructions: "",
  });

  useEffect(() => {
    fetchAssistantData();
  }, []);

  const fetchAssistantData = async () => {
    try {
      const response = await fetch("/api/assistants", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch assistant data");
      }

      const data = await response.json();
      setAssistantData({
        id: data.id || "",
        instructions: data.instructions || "",
      });
    } catch (error) {
      console.error("Error fetching assistant data:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch assistant data",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateAssistant = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/assistants/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          instructions: assistantData.instructions,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update assistant");
      }

      toast({
        title: "Success",
        description: "Assistant instructions updated successfully",
      });
    } catch (error) {
      console.error("Error updating assistant:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update assistant",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Assistant Instructions</h1>
          <p className="text-sm text-neutral-400 mt-1">
            Customize how the assistant behaves and responds
          </p>
        </div>
        <Button
          variant="outline"
          className="bg-neutral-800 border-neutral-700 hover:bg-neutral-700"
          onClick={handleUpdateAssistant}
          disabled={isSaving}
        >
          {isSaving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <SettingsIcon className="h-4 w-4 mr-2" />
          )}
          Save Changes
        </Button>
      </div>

      {/* Instructions */}
      <Card className="p-6 bg-neutral-800/50 border-neutral-700">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-neutral-200">
              Instructions
            </label>
            <p className="text-sm text-neutral-400 mt-1">
              Define how the assistant should behave and what knowledge it
              should prioritize
            </p>
          </div>
          <Textarea
            value={assistantData.instructions}
            onChange={(e) =>
              setAssistantData({
                ...assistantData,
                instructions: e.target.value,
              })
            }
            placeholder="You are REVA, a specialized real estate analysis assistant..."
            className="min-h-[400px] bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500"
          />
        </div>
      </Card>
    </div>
  );
}
