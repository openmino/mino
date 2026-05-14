import chalk from "chalk";
import fs from "fs";

export class APIClient {
  private apiKey: string;
  private model: "qwen/qwen3-32b";

  constructor(apiKey: string, model: "qwen/qwen3-32b") {
    this.apiKey = apiKey;
    this.model = model;
  }

  setup() {
    console.log(`💻 Starting API Client Setup...`);
    const APIKey = prompt(`🔑 Put your API Key here:`);
    if (!APIKey) {
      throw new Error("An API key was not provided.");
    }
    if (APIKey) {
      fs.writeFileSync(".env", `AI_API_KEY=${APIKey}`);
      console.log(`💻 Setup complete.`);
    }
  }
}
