export let assistantId = process.env.OPENAI_ASSISTANT_ID; // set your assistant ID here

if (assistantId === "") {
  assistantId = process.env.OPENAI_ASSISTANT_ID;
}
