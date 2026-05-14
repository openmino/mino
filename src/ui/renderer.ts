import chalk from "chalk";
import { marked } from "marked";

const mdRender = {
  code: chalk.hex("#8afdda"),

  heading: chalk.bold.hex("#0033ff"),
  strong: chalk.bold.white,
  em: chalk.italic.hex("#67E8F9"),
  del: chalk.strikethrough.gray,

  listitem: chalk.white,
  checkbox: chalk.hex("#0296ff"),

  blockquote: chalk.gray.italic,
  table: chalk.hex("#00eaff"),
};

export function renderMarkdown(content: string): string {
  if (!content || typeof content !== "string") {
    return "";
  }

  try {
    const rendered = marked.parse(content);

    if (typeof rendered !== "string") {
      return content;
    }

    return rendered;
  } catch (error) {
    return content;
  }
}
