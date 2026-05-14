import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.AI_API_KEY,
});

export async function chatCompletion() {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: "",
      },
    ],
    model: "qwen/qwen3-32b",
    temperature: 0.6,
    max_completion_tokens: 4096,
    top_p: 0.95,
    stream: true,
    reasoning_effort: "default",
    stop: null,
  });

  for await (const chunk of chatCompletion) {
    process.stdout.write(chunk.choices[0]?.delta?.content || "");
  }
}

export const chatComplet = chatCompletion();
