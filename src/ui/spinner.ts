// this is based in the https://github.com/shindozk/luxyie.ai-cli/blob/main/src/ui/spinner.ts code.

import chalk from "chalk";
import ora, { Ora } from "ora";

export class Spinner {
  private spinner: Ora | null = null;

  start(text: string): void {
    if (this.spinner) {
      this.spinner.text = text;
      this.spinner.start();
    } else {
      this.spinner = ora({
        text: text,
        color: "cyan",
        spinner: "dots",
      }).start();
    }
  }

  stop(): void {
    if (this.spinner) {
      this.spinner.stop();
      this.spinner = null;
    }
  }

  fail(text: string) {
    if (this.spinner) {
      this.spinner.fail(chalk.red(text));
    }
  }
}

export const spinner = new Spinner();
