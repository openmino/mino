import chalk from "chalk";
import boxen from "boxen";

export interface UpdateInfo {
  updateAvaiable: boolean;
  updateName: string;
  latest?: string | undefined;
  current?: string | undefined;
  publishedAt?: string | undefined;
}
export class UpdaterService {
  private packageName: string;
  private currentVersion: string;

  constructor() {
    this.currentVersion = process.env.APP_VERSION || "0.0.1";
    this.packageName = process.env.APP_NAME || "mino";
  }

  createUpdateNotification(
    latest: string,
    current: string,
    publishedAt?: string,
  ) {
    const dateInfo = publishedAt
      ? `\n${chalk.dim("Published:")} ${chalk.dim(new Date(publishedAt).toLocaleDateString())}`
      : "";

    const message = [
      chalk.cyan.bold(`💫 Update Available!`),
      "",
      `Current: ${chalk.red(current)}`,
      `Latest: ${chalk.green(latest)}${dateInfo}`,
      "",
      chalk.dim("Run ") +
        chalk.cyan.bold("mino update install") +
        chalk.dim(" to update"),
      chalk.dim("Or: ") + chalk.cyan(`npm update -g ${this.packageName}`),
    ].join("\n");

    return boxen(message, {
      padding: 1,
      borderColor: "cyan",
      title: ` ${this.packageName} `,
      titleAlignment: "center",
    });
  }

  showUpdateNotification(
    latest: string,
    current: string,
    publishedAt?: string,
  ): void {
    console.log("");
    console.log(this.createUpdateNotification(latest, current, publishedAt));
    console.log("");
  }
}

export const updaterService = new UpdaterService();
