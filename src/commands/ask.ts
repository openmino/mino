import chalk from "chalk";
import { Spinner } from "../ui/spinner.js";
import { APIClient } from "../services/APIClient.js";
import { systemPrompt } from "../prompts/systemPrompt.js";
import * as executor from "../executor.js";

export class AskCommand {
  private apiClient: APIClient;
  private sysPrompt: typeof systemPrompt;

  constructor(apiClient: APIClient) {
    this.apiClient = apiClient;
    this.sysPrompt = systemPrompt;
  }

  async startAskCommand(question: string) {
    const messages = [
      { role: "system", content: this.sysPrompt },
      { role: "user", content: question },
    ];

    const spinner = new Spinner();
    spinner.start("Thinking...");
  }
}