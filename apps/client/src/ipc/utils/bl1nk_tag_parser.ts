import { normalizePath } from "../../../shared/normalizePath";
import log from "electron-log";
import { SqlQuery } from "../../lib/schemas";

const logger = log.scope("bl1nk_tag_parser");

export function getBl1nkWriteTags(fullResponse: string): {
  path: string;
  content: string;
  description?: string;
}[] {
  const bl1nkWriteRegex = /<bl1nk-write([^>]*)>([\s\S]*?)</bl1nk-write>/gi;
  const pathRegex = /path="([^"]+)"/;
  const descriptionRegex = /description="([^"]+)"/;

  let match;
  const tags: { path: string; content: string; description?: string }[] = [];

  while ((match = bl1nkWriteRegex.exec(fullResponse)) !== null) {
    const attributesString = match[1];
    let content = match[2].trim();

    const pathMatch = pathRegex.exec(attributesString);
    const descriptionMatch = descriptionRegex.exec(attributesString);

    if (pathMatch && pathMatch[1]) {
      const path = pathMatch[1];
      const description = descriptionMatch?.[1];

      const contentLines = content.split("\n");
      if (contentLines[0]?.startsWith("```")) {
        contentLines.shift();
      }
      if (contentLines[contentLines.length - 1]?.startsWith("```")) {
        contentLines.pop();
      }
      content = contentLines.join("\n");

      tags.push({ path: normalizePath(path), content, description });
    } else {
      logger.warn(
        "Found <bl1nk-write> tag without a valid 'path' attribute:",
        match[0],
      );
    }
  }
  return tags;
}

export function getBl1nkRenameTags(fullResponse: string): {
  from: string;
  to: string;
}[] {
  const bl1nkRenameRegex =
    /<bl1nk-rename from="([^"]+)" to="([^"]+)"[^>]*>([\s\S]*?)</bl1nk-rename>/g;
  let match;
  const tags: { from: string; to: string }[] = [];
  while ((match = bl1nkRenameRegex.exec(fullResponse)) !== null) {
    tags.push({
      from: normalizePath(match[1]),
      to: normalizePath(match[2]),
    });
  }
  return tags;
}

export function getBl1nkDeleteTags(fullResponse: string): string[] {
  const bl1nkDeleteRegex =
    /<bl1nk-delete path="([^"]+)"[^>]*>([\s\S]*?)</bl1nk-delete>/g;
  let match;
  const paths: string[] = [];
  while ((match = bl1nkDeleteRegex.exec(fullResponse)) !== null) {
    paths.push(normalizePath(match[1]));
  }
  return paths;
}

export function getBl1nkAddDependencyTags(fullResponse: string): string[] {
  const bl1nkAddDependencyRegex =
    /<bl1nk-add-dependency packages="([^"]+)">[^<]*<\/bl1nk-add-dependency>/g;
  let match;
  const packages: string[] = [];
  while ((match = bl1nkAddDependencyRegex.exec(fullResponse)) !== null) {
    packages.push(...match[1].split(" "));
  }
  return packages;
}

export function getBl1nkChatSummaryTag(fullResponse: string): string | null {
  const bl1nkChatSummaryRegex =
    /<bl1nk-chat-summary>([\s\S]*?)</bl1nk-chat-summary>/g;
  const match = bl1nkChatSummaryRegex.exec(fullResponse);
  if (match && match[1]) {
    return match[1].trim();
  }
  return null;
}

export function getBl1nkExecuteSqlTags(fullResponse: string): SqlQuery[] {
  const bl1nkExecuteSqlRegex =
    /<bl1nk-execute-sql([^>]*)>([\s\S]*?)</bl1nk-execute-sql>/g;
  const descriptionRegex = /description="([^"]+)"/;
  let match;
  const queries: { content: string; description?: string }[] = [];

  while ((match = bl1nkExecuteSqlRegex.exec(fullResponse)) !== null) {
    const attributesString = match[1] || "";
    let content = match[2].trim();
    const descriptionMatch = descriptionRegex.exec(attributesString);
    const description = descriptionMatch?.[1];

    // Handle markdown code blocks if present
    const contentLines = content.split("\n");
    if (contentLines[0]?.startsWith("```")) {
      contentLines.shift();
    }
    if (contentLines[contentLines.length - 1]?.startsWith("```")) {
      contentLines.pop();
    }
    content = contentLines.join("\n");

    queries.push({ content, description });
  }

  return queries;
}

export function getBl1nkCommandTags(fullResponse: string): string[] {
  const bl1nkCommandRegex =
    /<bl1nk-command type="([^"]+)"[^>]*></bl1nk-command>/g;
  let match;
  const commands: string[] = [];

  while ((match = bl1nkCommandRegex.exec(fullResponse)) !== null) {
    commands.push(match[1]);
  }

  return commands;
}

export function getBl1nkSearchReplaceTags(fullResponse: string): {
  path: string;
  content: string;
  description?: string;
}[] {
  const bl1nkSearchReplaceRegex =
    /<bl1nk-search-replace([^>]*)>([\s\S]*?)</bl1nk-search-replace>/gi;
  const pathRegex = /path="([^"]+)"/;
  const descriptionRegex = /description="([^"]+)"/;

  let match;
  const tags: { path: string; content: string; description?: string }[] = [];

  while ((match = bl1nkSearchReplaceRegex.exec(fullResponse)) !== null) {
    const attributesString = match[1] || "";
    let content = match[2].trim();

    const pathMatch = pathRegex.exec(attributesString);
    const descriptionMatch = descriptionRegex.exec(attributesString);

    if (pathMatch && pathMatch[1]) {
      const path = pathMatch[1];
      const description = descriptionMatch?.[1];

      // Handle markdown code fences if present
      const contentLines = content.split("\n");
      if (contentLines[0]?.startsWith("```")) {
        contentLines.shift();
      }
      if (contentLines[contentLines.length - 1]?.startsWith("```")) {
        contentLines.pop();
      }
      content = contentLines.join("\n");

      tags.push({ path: normalizePath(path), content, description });
    } else {
      logger.warn(
        "Found <bl1nk-search-replace> tag without a valid 'path' attribute:",
        match[0],
      );
    }
  }
  return tags;
}
