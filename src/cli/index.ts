import { Command } from "commander";
import chalk from "chalk";
import { APIClient } from "../services/APIClient";

async function showPanel() {
  const panel = `
     __  __  _____  _   _   ____  
    |  \/  ||_   _|| \ | | / __ \ 
    | \  / |  | |  |  \| || |  | |
    | |\/| |  | |  | . \` || |  | |
    | |  | | _| |_ | |\  || |__| |
    |_|  |_||_____||_| \_| \____/ 

    -------------------------------
    Model: qwen/qwen3-32b
`;

  console.log(`\x1b[36m${panel}\x1b[0m`);
}

process.on("exit", () => {
  console.log(`${chalk.cyan("👋 Goodbye! Shutting Down...")}`);
  process.exit(0);
});

process.on("SIGTERM", () => {
  process.exit(0);
});

export function setupCLI() {
  const program = new Command();

  program
    .name("mino")
    .description("Mino - Personal Developer AI Assistent")
    .helpOption("-h", "--help");

  // =====================================
  //     Command: Ask
  // =====================================

  program
    .command("ask")
    .alias("a")
    .description("Ask a quick question without starting a chat session")
    .argument("<question>", "The question to ask")
    .action(async (question) => {
      const apiClient = new APIClient(
        process.env.AI_API_KEY!,
        "qwen/qwen3-32b",
      );
    });
}
