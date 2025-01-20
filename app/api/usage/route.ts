import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  try {
    const startTime = Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60; // Last 7 days

    // Mock data for development since the costs API requires organization admin access
    const mockData = {
      object: "page",
      data: Array.from({ length: 7 }, (_, i) => ({
        object: "bucket",
        start_time: startTime + i * 24 * 60 * 60,
        end_time: startTime + (i + 1) * 24 * 60 * 60,
        results: [
          {
            object: "organization.costs.result",
            amount: {
              value: Math.random() * 5, // Random value between 0 and 5
              currency: "usd",
            },
            line_item: "GPT-4",
            project_id: null,
          },
        ],
      })),
    };

    return NextResponse.json(mockData);

    /* Uncomment this section when you have organization admin access
    const response = await fetch(
      `https://api.openai.com/v1/organization/costs?start_time=${startTime}&limit=7`,
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to fetch usage data");
    }

    const data = await response.json();
    return NextResponse.json(data);
    */
  } catch (error) {
    console.error("Error fetching usage data:", error);
    return NextResponse.json(
      { error: "Failed to fetch usage data" },
      { status: 500 }
    );
  }
}
