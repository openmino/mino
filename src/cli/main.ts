import { Command } from "commander";
import { APIClient } from "../services/APIClient.js";

async function showPanel() {
  const panel = `
     __  __  _____  _   _    ____  
    |  \/  ||_   _|| \ | |  / __ \ 
    | \  / |  | |  |  \| | | |  | |
    | |\/| |  | |  | . \`| | |  | |
    | |  | | _| |_ | |\  | | |__| |
    |_|  |_||_____||_| \_|  \____/ 

    -------------------------------
    Model: qwen/qwen3-32b
`;

  console.log(`\x1b[36m${panel}\x1b[0m`);
}

const program = new Command();

program
  .name("mino")
  .description("Mino - Personal Developer AI Assistant")
  .helpOption("-h", "--help");

program
  .command("ask")
  .alias("-a")
  .description("Ask a quick question without starting a chat session")
  .argument("<question>", "The question to ask")
  .action(async (question) => {
    const apiClient = new APIClient(process.env.AI_API_KEY!, "qwen/qwen3-32b");
    console.log(`You asked: ${question}`);
  });

program
  .command("welcome")
  .alias("-w")
  .description("Show Welcome Panel")
  .action(async () => {
    await showPanel();
  });

program.parse(process.argv);