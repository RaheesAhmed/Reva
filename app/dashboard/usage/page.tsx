"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  BarChart as BarChartIcon,
  DollarSign,
  ArrowUp,
  ArrowDown,
  Loader2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface UsageData {
  object: string;
  data: Array<{
    object: string;
    start_time: number;
    end_time: number;
    results: Array<{
      object: string;
      amount: {
        value: number;
        currency: string;
      };
      line_item: string | null;
      project_id: string | null;
    }>;
  }>;
}

export default function UsagePage() {
  const [usageData, setUsageData] = useState<UsageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsageData();
  }, []);

  const fetchUsageData = async () => {
    try {
      const response = await fetch("/api/usage");
      if (!response.ok) {
        throw new Error("Failed to fetch usage data");
      }
      const data = await response.json();
      setUsageData(data);
    } catch (error) {
      console.error("Error fetching usage data:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch usage data",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getTotalCost = () => {
    if (!usageData?.data) return 0;
    return usageData.data.reduce((total, bucket) => {
      return (
        total +
        bucket.results.reduce((sum, result) => sum + result.amount.value, 0)
      );
    }, 0);
  };

  const getChartData = () => {
    if (!usageData?.data) return [];
    return usageData.data.map((bucket) => ({
      date: new Date(bucket.start_time * 1000).toLocaleDateString(),
      cost: bucket.results.reduce(
        (sum, result) => sum + result.amount.value,
        0
      ),
    }));
  };

  const getDailyChange = () => {
    if (!usageData?.data || usageData.data.length < 2) return 0;
    const latest = usageData.data[usageData.data.length - 1].results.reduce(
      (sum, result) => sum + result.amount.value,
      0
    );
    const previous = usageData.data[usageData.data.length - 2].results.reduce(
      (sum, result) => sum + result.amount.value,
      0
    );
    return ((latest - previous) / previous) * 100;
  };

  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Usage & Costs</h1>
        <Button
          variant="outline"
          className="bg-neutral-800 border-neutral-700 hover:bg-neutral-700"
          onClick={fetchUsageData}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <BarChartIcon className="h-4 w-4 mr-2" />
          )}
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Cost Card */}
        <Card className="p-6 bg-neutral-800/50 border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-400">Total Cost (7 days)</p>
              <p className="text-2xl font-semibold mt-1">
                ${getTotalCost().toFixed(2)}
              </p>
            </div>
            <div className="h-12 w-12 bg-neutral-800 rounded-full flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-reva-400" />
            </div>
          </div>
        </Card>

        {/* Daily Change Card */}
        <Card className="p-6 bg-neutral-800/50 border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-400">Daily Change</p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-2xl font-semibold">
                  {Math.abs(getDailyChange()).toFixed(1)}%
                </p>
                {getDailyChange() > 0 ? (
                  <ArrowUp className="h-5 w-5 text-red-400" />
                ) : (
                  <ArrowDown className="h-5 w-5 text-green-400" />
                )}
              </div>
            </div>
            <div className="h-12 w-12 bg-neutral-800 rounded-full flex items-center justify-center">
              <BarChartIcon className="h-6 w-6 text-reva-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Usage Chart */}
      <Card className="p-6 bg-neutral-800/50 border-neutral-700">
        <h2 className="text-lg font-medium mb-4">Daily Usage</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={getChartData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
              <XAxis
                dataKey="date"
                stroke="#737373"
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                stroke="#737373"
                fontSize={12}
                tickLine={false}
                tickFormatter={(value) => `$${value.toFixed(2)}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#262626",
                  border: "1px solid #404040",
                  borderRadius: "0.5rem",
                }}
                labelStyle={{ color: "#ffffff" }}
              />
              <Bar
                dataKey="cost"
                fill="#0294F7"
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
