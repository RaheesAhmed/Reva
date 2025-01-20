"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Settings as SettingsIcon, Loader2 } from "lucide-react";

interface AssistantData {
  id: string;
  name: string;
  description: string;
  instructions: string;
  model: string;
  tools: any[];
}

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [assistantData, setAssistantData] = useState<AssistantData>({
    id: "",
    name: "",
    description: "",
    instructions: "",
    model: "",
    tools: [],
  });

  useEffect(() => {
    fetchAssistantData();
  }, []);

  const fetchAssistantData = async () => {
    try {
      console.log("Fetching assistant data...");
      const response = await fetch("/api/assistants", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Response not OK:", errorData);
        throw new Error("Failed to fetch assistant data");
      }

      const data = await response.json();
      console.log("Received assistant data:", data);

      // Update state with the fetched data
      setAssistantData({
        id: data.id || "",
        name: data.name || "",
        description: data.description || "",
        instructions: data.instructions || "",
        model: data.model || "",
        tools: data.tools || [],
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
      console.log("Updating assistant with data:", assistantData);
      const response = await fetch("/api/assistants", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: assistantData.name,
          description: assistantData.description,
          instructions: assistantData.instructions,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Update response not OK:", errorData);
        throw new Error("Failed to update assistant");
      }

      const data = await response.json();
      console.log("Update successful:", data);

      toast({
        title: "Success",
        description: "Assistant updated successfully",
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
          <h1 className="text-2xl font-semibold">Assistant Settings</h1>
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

      {/* Basic Settings */}
      <Card className="p-6 bg-neutral-800/50 border-neutral-700">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-neutral-200">
              Assistant Name
            </label>
            <Input
              value={assistantData.name}
              onChange={(e) =>
                setAssistantData({ ...assistantData, name: e.target.value })
              }
              className="mt-2 bg-neutral-800 border-neutral-700 text-white"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-200">
              Description
            </label>
            <Textarea
              value={assistantData.description}
              onChange={(e) =>
                setAssistantData({
                  ...assistantData,
                  description: e.target.value,
                })
              }
              className="mt-2 bg-neutral-800 border-neutral-700 text-white"
              rows={3}
            />
          </div>
        </div>
      </Card>

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
            className="min-h-[200px] bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500"
          />
        </div>
      </Card>

      {/* Model Settings */}
      <Card className="p-6 bg-neutral-800/50 border-neutral-700">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-medium">Model Configuration</h2>
            <p className="text-sm text-neutral-400 mt-1">
              Current model: {assistantData.model}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-400">
            <SettingsIcon className="h-4 w-4" />
            <p>Using optimal settings for real estate analysis</p>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-neutral-200 mb-2">
              Enabled Tools
            </h3>
            <div className="space-y-2">
              {assistantData.tools.map((tool, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-neutral-400"
                >
                  <div className="h-2 w-2 rounded-full bg-green-400" />
                  <span>{tool.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Assistant ID */}
      <Card className="p-6 bg-neutral-800/50 border-neutral-700">
        <div className="space-y-2">
          <h2 className="text-lg font-medium">Assistant ID</h2>
          <p className="font-mono text-sm text-neutral-400">
            {assistantData.id}
          </p>
        </div>
      </Card>
    </div>
  );
}
