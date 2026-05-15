import chalk from "chalk";

export interface tokenLimitInfo {
  modelId: string;
  maxTokens: number;
  currentTokens: number;
  usagePercentage: number;
}

export function isTokenLimitApproaching(
  currentTokens: number,
  maxTokens: number,
  threshold: number = 0.8,
): boolean {
  return currentTokens >= maxTokens * threshold;
}

export function isTokenLimitExceeded(
  currentTokens: number,
  maxTokens: number,
): boolean {
  return currentTokens >= maxTokens;
}

export function getTokenLimitInfo(
  modelId: string,
  maxTokens: number,
  currentTokens: number,
): tokenLimitInfo {
  return {
    modelId,
    maxTokens,
    currentTokens,
    usagePercentage: Math.round((currentTokens / maxTokens) * 100),
  };
}

export function showTokenLimitError(info: tokenLimitInfo) {
  const error = [
    `🚫 Token limit exceeded`,
    `Model: ${info.modelId}`,
    `Usage: ${info.currentTokens.toLocaleString()} / ${info.maxTokens.toLocaleString()} (100%)`,
    ``,
    `The model has reached its token limit. To continue:`,
    `2. Restart the CLI to start a fresh session`,
    `3. Or switch to a model with higher token limits`,
  ];
  return error.join("\n");
}

/**
 * Create a visual progress bar
 */
function createProgressBar(percentage: number, width: number): string {
  const filled = Math.round((percentage / 100) * width);
  const empty = width - filled;

  const color =
    percentage < 50 ? chalk.green : percentage < 80 ? chalk.yellow : chalk.red;
  const filledChar = "█";
  const emptyChar = "░";

  return color(filledChar.repeat(filled) + emptyChar.repeat(empty));
}
