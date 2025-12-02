import React, { useMemo } from "react";
import ReactMarkdown from "react-markdown";

import { Bl1nkWrite } from "./Bl1nkWrite";
import { Bl1nkRename } from "./Bl1nkRename";
import { Bl1nkDelete } from "./Bl1nkDelete";
import { Bl1nkAddDependency } from "./Bl1nkAddDependency";
import { Bl1nkExecuteSql } from "./Bl1nkExecuteSql";
import { Bl1nkAddIntegration } from "./Bl1nkAddIntegration";
import { Bl1nkEdit } from "./Bl1nkEdit";
import { Bl1nkSearchReplace } from "./Bl1nkSearchReplace";
import { Bl1nkCodebaseContext } from "./Bl1nkCodebaseContext";
import { Bl1nkThink } from "./Bl1nkThink";
import { CodeHighlight } from "./CodeHighlight";
import { useAtomValue } from "jotai";
import { isStreamingByIdAtom, selectedChatIdAtom } from "@/atoms/chatAtoms";
import { CustomTagState } from "./stateTypes";
import { Bl1nkOutput } from "./Bl1nkOutput";
import { Bl1nkProblemSummary } from "./Bl1nkProblemSummary";
import { IpcClient } from "@/ipc/ipc_client";
import { Bl1nkMcpToolCall } from "./Bl1nkMcpToolCall";
import { Bl1nkMcpToolResult } from "./Bl1nkMcpToolResult";
import { Bl1nkWebSearchResult } from "./Bl1nkWebSearchResult";
import { Bl1nkWebSearch } from "./Bl1nkWebSearch";
import { Bl1nkWebCrawl } from "./Bl1nkWebCrawl";
import { Bl1nkCodeSearchResult } from "./Bl1nkCodeSearchResult";
import { Bl1nkCodeSearch } from "./Bl1nkCodeSearch";
import { Bl1nkRead } from "./Bl1nkRead";
import { mapActionToButton } from "./ChatInput";
import { SuggestedAction } from "@/lib/schemas";

interface Bl1nkMarkdownParserProps {
  content: string;
}

type CustomTagInfo = {
  tag: string;
  attributes: Record<string, string>;
  content: string;
  fullMatch: string;
  inProgress?: boolean;
};

type ContentPiece =
  | { type: "markdown"; content: string }
  | { type: "custom-tag"; tagInfo: CustomTagInfo };

const customLink = ({
  node: _node,
  ...props
}: {
  node?: any;
  [key: string]: any;
}) => (
  <a
    {...props}
    onClick={(e) => {
      const url = props.href;
      if (url) {
        e.preventDefault();
        IpcClient.getInstance().openExternalUrl(url);
      }
    }}
  />
);

export const VanillaMarkdownParser = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      components={{
        code: CodeHighlight,
        a: customLink,
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

/**
 * Custom component to parse markdown content with bl1nk-specific tags
 */
export const Bl1nkMarkdownParser: React.FC<Bl1nkMarkdownParserProps> = ({
  content,
}) => {
  const chatId = useAtomValue(selectedChatIdAtom);
  const isStreaming = useAtomValue(isStreamingByIdAtom).get(chatId!) ?? false;
  // Extract content pieces (markdown and custom tags)
  const contentPieces = useMemo(() => {
    return parseCustomTags(content);
  }, [content]);

  return (
    <>
      {contentPieces.map((piece, index) => (
        <React.Fragment key={index}>
          {piece.type === "markdown"
            ? piece.content && (
                <ReactMarkdown
                  components={{
                    code: CodeHighlight,
                    a: customLink,
                  }}
                >
                  {piece.content}
                </ReactMarkdown>
              )
            : renderCustomTag(piece.tagInfo, { isStreaming })}
        </React.Fragment>
      ))}
    </>
  );
};

/**
 * Pre-process content to handle unclosed custom tags
 * Adds closing tags at the end of the content for any unclosed custom tags
 * Assumes the opening tags are complete and valid
 * Returns the processed content and a map of in-progress tags
 */
function preprocessUnclosedTags(content: string): {
  processedContent: string;
  inProgressTags: Map<string, Set<number>>;
} {
  const customTagNames = [
    "bl1nk-write",
    "bl1nk-rename",
    "bl1nk-delete",
    "bl1nk-add-dependency",
    "bl1nk-execute-sql",
    "bl1nk-add-integration",
    "bl1nk-output",
    "bl1nk-problem-report",
    "bl1nk-chat-summary",
    "bl1nk-edit",
    "bl1nk-search-replace",
    "bl1nk-codebase-context",
    "dyad-web-search-result",
    "bl1nk-web-search",
    "bl1nk-web-crawl",
    "bl1nk-read",
    "think",
    "bl1nk-command",
    "bl1nk-mcp-tool-call",
    "bl1nk-mcp-tool-result",
  ];

  let processedContent = content;
  // Map to track which tags are in progress and their positions
  const inProgressTags = new Map<string, Set<number>>();

  // For each tag type, check if there are unclosed tags
  for (const tagName of customTagNames) {
    // Count opening and closing tags
    const openTagPattern = new RegExp(`<${tagName}(?:\\s[^>]*)?>`, "g");
    const closeTagPattern = new RegExp(`</${tagName}>`, "g");

    // Track the positions of opening tags
    const openingMatches: RegExpExecArray[] = [];
    let match;

    // Reset regex lastIndex to start from the beginning
    openTagPattern.lastIndex = 0;

    while ((match = openTagPattern.exec(processedContent)) !== null) {
      openingMatches.push({ ...match });
    }

    const openCount = openingMatches.length;
    const closeCount = (processedContent.match(closeTagPattern) || []).length;

    // If we have more opening than closing tags
    const missingCloseTags = openCount - closeCount;
    if (missingCloseTags > 0) {
      // Add the required number of closing tags at the end
      processedContent += Array(missingCloseTags)
        .fill(`</${tagName}>`)
        .join("");

      // Mark the last N tags as in progress where N is the number of missing closing tags
      const inProgressIndexes = new Set<number>();
      const startIndex = openCount - missingCloseTags;
      for (let i = startIndex; i < openCount; i++) {
        inProgressIndexes.add(openingMatches[i].index);
      }
      inProgressTags.set(tagName, inProgressIndexes);
    }
  }

  return { processedContent, inProgressTags };
}

/**
 * Parse the content to extract custom tags and markdown sections into a unified array
 */
function parseCustomTags(content: string): ContentPiece[] {
  const { processedContent, inProgressTags } = preprocessUnclosedTags(content);

  const customTagNames = [
    "bl1nk-write",
    "bl1nk-rename",
    "bl1nk-delete",
    "bl1nk-add-dependency",
    "bl1nk-execute-sql",
    "bl1nk-add-integration",
    "bl1nk-output",
    "bl1nk-problem-report",
    "bl1nk-chat-summary",
    "bl1nk-edit",
    "bl1nk-search-replace",
    "bl1nk-codebase-context",
    "dyad-web-search-result",
    "bl1nk-web-search",
    "bl1nk-web-crawl",
    "bl1nk-code-search-result",
    "bl1nk-code-search",
    "bl1nk-read",
    "think",
    "bl1nk-command",
    "bl1nk-mcp-tool-call",
    "bl1nk-mcp-tool-result",
  ];

  const tagPattern = new RegExp(
    `<(${customTagNames.join("|")})\\s*([^>]*)>(.*?)<\\/\\1>`,
    "gs",
  );

  const contentPieces: ContentPiece[] = [];
  let lastIndex = 0;
  let match;

  // Find all custom tags
  while ((match = tagPattern.exec(processedContent)) !== null) {
    const [fullMatch, tag, attributesStr, tagContent] = match;
    const startIndex = match.index;

    // Add the markdown content before this tag
    if (startIndex > lastIndex) {
      contentPieces.push({
        type: "markdown",
        content: processedContent.substring(lastIndex, startIndex),
      });
    }

    // Parse attributes
    const attributes: Record<string, string> = {};
    const attrPattern = /(\w+)="([^"]*)"/g;
    let attrMatch;
    while ((attrMatch = attrPattern.exec(attributesStr)) !== null) {
      attributes[attrMatch[1]] = attrMatch[2];
    }

    // Check if this tag was marked as in progress
    const tagInProgressSet = inProgressTags.get(tag);
    const isInProgress = tagInProgressSet?.has(startIndex);

    // Add the tag info
    contentPieces.push({
      type: "custom-tag",
      tagInfo: {
        tag,
        attributes,
        content: tagContent,
        fullMatch,
        inProgress: isInProgress || false,
      },
    });

    lastIndex = startIndex + fullMatch.length;
  }

  // Add the remaining markdown content
  if (lastIndex < processedContent.length) {
    contentPieces.push({
      type: "markdown",
      content: processedContent.substring(lastIndex),
    });
  }

  return contentPieces;
}

function getState({
  isStreaming,
  inProgress,
}: {
  isStreaming?: boolean;
  inProgress?: boolean;
}): CustomTagState {
  if (!inProgress) {
    return "finished";
  }
  return isStreaming ? "pending" : "aborted";
}

/**
 * Render a custom tag based on its type
 */
function renderCustomTag(
  tagInfo: CustomTagInfo,
  { isStreaming }: { isStreaming: boolean },
): React.ReactNode {
  const { tag, attributes, content, inProgress } = tagInfo;

  switch (tag) {
    case "bl1nk-read":
      return (
        <Bl1nkRead
          node={{
            properties: {
              path: attributes.path || "",
            },
          }}
        >
          {content}
        </Bl1nkRead>
      );
    case "bl1nk-web-search":
      return (
        <Bl1nkWebSearch
          node={{
            properties: {},
          }}
        >
          {content}
        </Bl1nkWebSearch>
      );
    case "bl1nk-web-crawl":
      return (
        <Bl1nkWebCrawl
          node={{
            properties: {},
          }}
        >
          {content}
        </Bl1nkWebCrawl>
      );
    case "bl1nk-code-search":
      return (
        <Bl1nkCodeSearch
          node={{
            properties: {},
          }}
        >
          {content}
        </Bl1nkCodeSearch>
      );
    case "bl1nk-code-search-result":
      return (
        <Bl1nkCodeSearchResult
          node={{
            properties: {},
          }}
        >
          {content}
        </Bl1nkCodeSearchResult>
      );
    case "dyad-web-search-result":
      return (
        <Bl1nkWebSearchResult
          node={{
            properties: {
              state: getState({ isStreaming, inProgress }),
            },
          }}
        >
          {content}
        </Bl1nkWebSearchResult>
      );
    case "think":
      return (
        <Bl1nkThink
          node={{
            properties: {
              state: getState({ isStreaming, inProgress }),
            },
          }}
        >
          {content}
        </Bl1nkThink>
      );
    case "bl1nk-write":
      return (
        <Bl1nkWrite
          node={{
            properties: {
              path: attributes.path || "",
              description: attributes.description || "",
              state: getState({ isStreaming, inProgress }),
            },
          }}
        >
          {content}
        </Bl1nkWrite>
      );

    case "bl1nk-rename":
      return (
        <Bl1nkRename
          node={{
            properties: {
              from: attributes.from || "",
              to: attributes.to || "",
            },
          }}
        >
          {content}
        </Bl1nkRename>
      );

    case "bl1nk-delete":
      return (
        <Bl1nkDelete
          node={{
            properties: {
              path: attributes.path || "",
            },
          }}
        >
          {content}
        </Bl1nkDelete>
      );

    case "bl1nk-add-dependency":
      return (
        <Bl1nkAddDependency
          node={{
            properties: {
              packages: attributes.packages || "",
            },
          }}
        >
          {content}
        </Bl1nkAddDependency>
      );

    case "bl1nk-execute-sql":
      return (
        <Bl1nkExecuteSql
          node={{
            properties: {
              state: getState({ isStreaming, inProgress }),
              description: attributes.description || "",
            },
          }}
        >
          {content}
        </Bl1nkExecuteSql>
      );

    case "bl1nk-add-integration":
      return (
        <Bl1nkAddIntegration
          node={{
            properties: {
              provider: attributes.provider || "",
            },
          }}
        >
          {content}
        </Bl1nkAddIntegration>
      );

    case "bl1nk-edit":
      return (
        <Bl1nkEdit
          node={{
            properties: {
              path: attributes.path || "",
              description: attributes.description || "",
              state: getState({ isStreaming, inProgress }),
            },
          }}
        >
          {content}
        </Bl1nkEdit>
      );

    case "bl1nk-search-replace":
      return (
        <Bl1nkSearchReplace
          node={{
            properties: {
              path: attributes.path || "",
              description: attributes.description || "",
              state: getState({ isStreaming, inProgress }),
            },
          }}
        >
          {content}
        </Bl1nkSearchReplace>
      );

    case "bl1nk-codebase-context":
      return (
        <Bl1nkCodebaseContext
          node={{
            properties: {
              files: attributes.files || "",
              state: getState({ isStreaming, inProgress }),
            },
          }}
        >
          {content}
        </Bl1nkCodebaseContext>
      );

    case "bl1nk-mcp-tool-call":
      return (
        <Bl1nkMcpToolCall
          node={{
            properties: {
              serverName: attributes.server || "",
              toolName: attributes.tool || "",
            },
          }}
        >
          {content}
        </Bl1nkMcpToolCall>
      );

    case "bl1nk-mcp-tool-result":
      return (
        <Bl1nkMcpToolResult
          node={{
            properties: {
              serverName: attributes.server || "",
              toolName: attributes.tool || "",
            },
          }}
        >
          {content}
        </Bl1nkMcpToolResult>
      );

    case "bl1nk-output":
      return (
        <Bl1nkOutput
          type={attributes.type as "warning" | "error"}
          message={attributes.message}
        >
          {content}
        </Bl1nkOutput>
      );

    case "bl1nk-problem-report":
      return (
        <Bl1nkProblemSummary summary={attributes.summary}>
          {content}
        </Bl1nkProblemSummary>
      );

    case "bl1nk-chat-summary":
      // Don't render anything for dyad-chat-summary
      return null;

    case "bl1nk-command":
      if (attributes.type) {
        const action = {
          id: attributes.type,
        } as SuggestedAction;
        return <>{mapActionToButton(action)}</>;
      }
      return null;

    default:
      return null;
  }
}
