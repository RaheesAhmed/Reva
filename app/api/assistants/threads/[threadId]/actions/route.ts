import { openai } from "@/app/openai";
import { NextResponse } from "next/server";

// Send a new message to a thread
export async function POST(request, { params: { threadId } }) {
  try {
    const { toolCallOutputs, runId } = await request.json();

    // Submit tool outputs
    await openai.beta.threads.runs.submitToolOutputs(
      threadId,
      runId,
      { tool_outputs: toolCallOutputs }
    );

    // Get run status and wait for completion
    let runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);

    // Create a stream to send updates
    const stream = new ReadableStream({
      async start(controller) {
        try {
          while (!['completed', 'failed', 'cancelled', 'expired'].includes(runStatus.status)) {
            controller.enqueue(new TextEncoder().encode(JSON.stringify(runStatus) + "\n"));
            
            // Wait a bit before checking again
            await new Promise(resolve => setTimeout(resolve, 1000));
            runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
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
    console.error('Error in tool outputs submission:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
