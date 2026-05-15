import fs from "fs";
import path from "path";
import { spawn } from "child_process";

export interface ProjectFile {
  path: string;
  content: string;
  executable?: boolean;
}

export interface RunCommandOptions {
  cwd?: string;
  env?: NodeJS.ProcessEnv;
  timeoutMs?: number;
  captureOutput?: boolean;
}

export interface RunCommandResult {
  stdout: string;
  stderr: string;
  exitCode: number | null;
}

export interface SearchOptions {
  engine?: "google" | "bing" | "duckduckgo";
}

function ensureDirectoryForFile(filePath: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export async function writeProjectFiles(
  files: ProjectFile[],
  rootDir: string = process.cwd(),
): Promise<void> {
  await Promise.all(
    files.map(async (file) => {
      const absolutePath = path.resolve(rootDir, file.path);
      ensureDirectoryForFile(absolutePath);
      await fs.promises.writeFile(absolutePath, file.content, "utf8");

      if (file.executable && process.platform !== "win32") {
        await fs.promises.chmod(absolutePath, 0o755);
      }
    }),
  );
}

export function runCommand(
  command: string,
  options: RunCommandOptions = {},
): Promise<RunCommandResult> {
  return new Promise((resolve, reject) => {
    const stdoutChunks: string[] = [];
    const stderrChunks: string[] = [];
    const proc = spawn(command, {
      cwd: options.cwd ?? process.cwd(),
      env: { ...process.env, ...options.env },
      shell: true,
    });

    proc.stdout.on("data", (data: Buffer) => {
      const chunk = data.toString();
      stdoutChunks.push(chunk);
      if (options.captureOutput !== false) {
        process.stdout.write(chunk);
      }
    });

    proc.stderr.on("data", (data: Buffer) => {
      const chunk = data.toString();
      stderrChunks.push(chunk);
      if (options.captureOutput !== false) {
        process.stderr.write(chunk);
      }
    });

    if (typeof options.timeoutMs === "number") {
      setTimeout(() => {
        proc.kill("SIGTERM");
      }, options.timeoutMs);
    }

    proc.on("close", (code: number | null) => {
      resolve({
        stdout: stdoutChunks.join(""),
        stderr: stderrChunks.join(""),
        exitCode: code,
      });
    });

    proc.on("error", (error: Error) => {
      reject(error);
    });
  });
}

export function buildSearchUrl(
  query: string,
  engine: "google" | "bing" | "duckduckgo" = "google",
): string {
  const encoded = encodeURIComponent(query);

  switch (engine) {
    case "bing":
      return `https://www.bing.com/search?q=${encoded}`;
    case "duckduckgo":
      return `https://duckduckgo.com/?q=${encoded}`;
    default:
      return `https://www.google.com/search?q=${encoded}`;
  }
}

export async function searchWeb(
  query: string,
  options: SearchOptions = {},
): Promise<string> {
  const url = buildSearchUrl(query, options.engine ?? "google");
  await openUrl(url);
  return url;
}

export async function openUrl(url: string): Promise<void> {
  const safeUrl = url.replace(/"/g, '\\"');
  let command = "";

  if (process.platform === "win32") {
    command = `start "" "${safeUrl}"`;
  } else if (process.platform === "darwin") {
    command = `open "${safeUrl}"`;
  } else {
    command = `xdg-open "${safeUrl}"`;
  }

  await runCommand(command, { captureOutput: true });
}
