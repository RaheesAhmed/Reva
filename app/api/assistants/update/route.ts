import { openai } from "@/app/openai";
import { assistantId } from "@/app/assistant-config";
import { NextResponse } from "next/server";

// Update assistant instructions
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { instructions } = body;

    if (!instructions) {
      return NextResponse.json(
        { error: "Instructions are required" },
        { status: 400 }
      );
    }
    
    const assistant = await openai.beta.assistants.update(assistantId, {
      instructions,
    });

    return NextResponse.json({ success: true, assistant });
  } catch (error: any) {
    console.error("Error updating assistant:", error.message);
    return NextResponse.json(
      { error: "Failed to update assistant", details: error.message },
      { status: 500 }
    );
  }
}
