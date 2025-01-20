import { openai } from "@/app/openai";
import { assistantId } from "@/app/assistant-config";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Get current assistant data
export async function GET() {
  try {
    console.log("Fetching assistant with ID:", assistantId);
    const assistant = await openai.beta.assistants.retrieve(assistantId);
    console.log("Assistant data retrieved:", {assistant});
    return NextResponse.json(assistant);
  } catch (error: any) {
    console.error(
      "Error fetching assistant:",
      error.message,
      error.response?.data
    );
    return NextResponse.json(
      { error: "Failed to fetch assistant", details: error.message },
      { status: 500 }
    );
  }
}


