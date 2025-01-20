"use client";

import { useState, useEffect, Suspense } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  FileText,
  MessageSquare,
  BarChart,
  Settings,
  Loader2,
} from "lucide-react";
import Link from "next/link";

interface Stats {
  totalFiles: number;
  totalChats: number;
  dailyUsage: number;
}

// Skeleton loaders
function StatCardSkeleton() {
  return (
    <Card className="p-6 bg-neutral-800/50 border-neutral-700">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-neutral-800 animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 w-24 bg-neutral-800 rounded animate-pulse" />
          <div className="h-6 w-16 bg-neutral-800 rounded animate-pulse" />
        </div>
      </div>
    </Card>
  );
}

function QuickActionSkeleton() {
  return (
    <Card className="p-6 bg-neutral-800/50 border-neutral-700">
      <div className="space-y-4">
        <div className="h-10 w-10 rounded-full bg-neutral-800 animate-pulse" />
        <div>
          <div className="h-5 w-24 bg-neutral-800 rounded animate-pulse mb-2" />
          <div className="h-4 w-32 bg-neutral-800 rounded animate-pulse" />
        </div>
      </div>
    </Card>
  );
}

// Stats component with its own loading state
function StatsSection({
  stats,
  isLoading,
}: {
  stats: Stats;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="p-6 bg-neutral-800/50 border-neutral-700">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-blue-500/10 rounded-full flex items-center justify-center">
            <FileText className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-neutral-400">Total Files</p>
            <p className="text-2xl font-semibold">{stats.totalFiles}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-neutral-800/50 border-neutral-700">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-green-500/10 rounded-full flex items-center justify-center">
            <MessageSquare className="h-6 w-6 text-green-400" />
          </div>
          <div>
            <p className="text-sm text-neutral-400">Total Chats</p>
            <p className="text-2xl font-semibold">{stats.totalChats}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-neutral-800/50 border-neutral-700">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-purple-500/10 rounded-full flex items-center justify-center">
            <BarChart className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <p className="text-sm text-neutral-400">Daily Usage</p>
            <p className="text-2xl font-semibold">
              ${stats.dailyUsage.toFixed(2)}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Quick actions component
function QuickActions() {
  const quickActions = [
    {
      name: "Upload Files",
      description: "Add documents to the knowledge base",
      icon: FileText,
      href: "/dashboard/knowledge",
      color: "text-blue-400",
    },
    {
      name: "View Analytics",
      description: "Check usage and costs",
      icon: BarChart,
      href: "/dashboard/usage",
      color: "text-green-400",
    },
    {
      name: "Settings",
      description: "Configure assistant behavior",
      icon: Settings,
      href: "/dashboard/settings",
      color: "text-purple-400",
    },
    {
      name: "Chat",
      description: "Start a new conversation",
      icon: MessageSquare,
      href: "/chat",
      color: "text-orange-400",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <Link key={action.name} href={action.href}>
            <Card className="p-6 bg-neutral-800/50 border-neutral-700 hover:bg-neutral-800 transition-colors cursor-pointer">
              <div className="space-y-4">
                <div
                  className={`h-10 w-10 rounded-full bg-neutral-800 flex items-center justify-center ${action.color}`}
                >
                  <action.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">{action.name}</h3>
                  <p className="text-sm text-neutral-400 mt-1">
                    {action.description}
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalFiles: 0,
    totalChats: 0,
    dailyUsage: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch files count
      const filesResponse = await fetch("/api/assistants/files");
      const filesData = await filesResponse.json();

      // Get chats from localStorage
      const chats = JSON.parse(localStorage.getItem("chats") || "[]");

      // Mock daily usage for now
      const dailyUsage = Math.random() * 5;

      setStats({
        totalFiles: filesData.length,
        totalChats: chats.length,
        dailyUsage,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch dashboard stats",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-neutral-400 mt-1">
          Overview of your assistant's activity
        </p>
      </div>

      {/* Stats Grid with Suspense */}
      <Suspense fallback={<StatsSection stats={stats} isLoading={true} />}>
        <StatsSection stats={stats} isLoading={isLoading} />
      </Suspense>

      {/* Quick Actions with Suspense */}
      <Suspense
        fallback={
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <QuickActionSkeleton key={i} />
              ))}
            </div>
          </div>
        }
      >
        <QuickActions />
      </Suspense>
    </div>
  );
}
