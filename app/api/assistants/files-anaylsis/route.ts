import { assistantId } from "@/app/assistant-config";
import { openai } from "@/app/openai";
import fs from "fs";

// Upload file to Code Interpreter
export async function POST(request: any) {
  const formData = await request.formData();
  console.log("file Recieved") // process file as FormData
  const file = formData.get("file"); // retrieve the single file from FormData

  if (!file || !(file instanceof Blob)) {
    throw new Error("Invalid file");
  }

  // Upload file using the file stream
  const openaiFile = await openai.files.create({
    file: file as File,
    purpose: "assistants",
  });

  // Retrieve the assistant to get current files
  const assistant = await openai.beta.assistants.retrieve(assistantId);
  
  // Get existing file IDs or empty array if none exist
  const existingFileIds = assistant.tool_resources?.code_interpreter?.file_ids || [];
  
  // Append new file ID to existing ones
  const updatedFileIds = [...existingFileIds, openaiFile.id];

  // Update assistant with combined file IDs
  await openai.beta.assistants.update(assistantId, {
    tool_resources: {
      "code_interpreter": {
        "file_ids": updatedFileIds
      }
    },
  });

  return new Response(JSON.stringify({ fileId: openaiFile.id }), { status: 200 });
}

// List files associated with Code Interpreter
export async function GET() {
  // Retrieve the assistant's tool resources
  const assistant = await openai.beta.assistants.retrieve(assistantId);
  const fileIds = assistant.tool_resources?.code_interpreter?.file_ids || [];

  const filesArray = await Promise.all(
    fileIds.map(async (fileId) => {
      const fileDetails = await openai.files.retrieve(fileId);
      return {
        file_id: fileId,
        filename: fileDetails.filename,
        purpose: fileDetails.purpose,
      };
    })
  );

  return new Response(JSON.stringify(filesArray), { status: 200 });
}

// Delete file from Code Interpreter
export async function DELETE(request: any) {
  const body = await request.json();
  const fileId = body.fileId;

  if (!fileId) {
    throw new Error("File ID is required");
  }

  // Delete the file
  await openai.files.del(fileId)

  // Retrieve the assistant and update tool resources
  const assistant = await openai.beta.assistants.retrieve(assistantId);

  // Remove the file ID from tool resources
  const updatedFileIds = (assistant.tool_resources?.code_interpreter?.file_ids || []).filter(id => id !== fileId);

  await openai.beta.assistants.update(assistantId, {
    tool_resources: {
      "code_interpreter": {
        "file_ids": updatedFileIds
      }
    },
  });

  return new Response(null, { status: 204 });
}
