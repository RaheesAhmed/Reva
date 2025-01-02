import { assistantId } from "@/app/assistant-config";
import { openai } from "@/app/openai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Send a new message to a thread
export async function POST(request, { params: { threadId } }) {
  try {
    if (!assistantId) {
      throw new Error("Assistant ID is not configured");
    }

    // First, check for any active runs
    const runs = await openai.beta.threads.runs.list(threadId);
    const activeRun = runs.data.find(run => 
      ['in_progress', 'queued'].includes(run.status)
    );

    if (activeRun) {
      return NextResponse.json(
        { error: "A message is still being processed. Please wait." },
        { status: 400 }
      );
    }

    const { content } = await request.json();

    // Create the message
    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: content,
    });

    // Create a new run
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
    });

    // Get run status and wait for completion
    let runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);

    // Create a stream to send updates
    const stream = new ReadableStream({
      async start(controller) {
        try {
          while (!['completed', 'failed', 'cancelled', 'expired'].includes(runStatus.status)) {
            controller.enqueue(new TextEncoder().encode(JSON.stringify(runStatus) + "\n"));
            
            // Wait a bit before checking again
            await new Promise(resolve => setTimeout(resolve, 1000));
            runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
          }
          
          // Send final status
          controller.enqueue(new TextEncoder().encode(JSON.stringify(runStatus) + "\n"));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error in message processing:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
