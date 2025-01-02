import { openai } from "@/app/openai";

export const runtime = "nodejs";

// Create a new assistant
export async function POST() {
  const assistant = await openai.beta.assistants.create({
    instructions: `You are REVA, a specialized real estate analysis assistant.
  Your primary functions include:
  - Analyzing property metrics and market data
  - Providing insights on location value
  - Calculating financial metrics
  - Tracking infrastructure projects
  - Monitoring tenant credit ratings`,
    name: "Reva",
    description: "Reva is a real estate analysis tool that leverages OpenAI's Assistant API to provide instant property insights, market analysis, and valuation support.",
    model: "gpt-4o-mini",
    tools: [
      { type: "code_interpreter" },
      { type: "file_search" },
      {
        type: "function",
        function: {
          name: "get_weather",
          description: "Determine weather in my location",
          parameters: {
            type: "object",
            properties: {
              location: {
                type: "string",
                description: "The city and state e.g. San Francisco, CA",
              },
              unit: {
                type: "string",
                enum: ["c", "f"],
              },
            },
            required: ["location"],
          },
        },
      },
      { type: "file_search" },
    ],
  });

  console.log(assistant.id);
  return Response.json({ assistantId: assistant.id });
}
