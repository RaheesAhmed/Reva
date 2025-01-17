import { openai } from "@/app/openai";
import { Request } from "openai/src/_shims/node-types.mjs";

// Send a new message to a thread
export async function POST(
  request: Request,
  { params: { threadId } }: { params: { threadId: string } }
) {
  const { toolCallOutputs, runId } = await request.json();

  const stream = openai.beta.threads.runs.submitToolOutputsStream(
    threadId,
    runId,

    { tool_outputs: toolCallOutputs }
  );

  return new Response(stream.toReadableStream());
}
