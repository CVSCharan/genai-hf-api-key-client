import React from "react";
import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { DashboardMessageProps } from "@/types/types";

export const DashboardMessageDisplay: React.FC<DashboardMessageProps> = ({
  message,
  generatingMessageId,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  modelCategory = "conversation",
}) => {
  const isGenerating = message.id === generatingMessageId;

  // Custom renderer for code blocks
  const components = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={atomDark}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <div
      className={`flex ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          message.role === "user"
            ? "bg-purple-600/20 text-white"
            : "bg-gray-800/70 text-gray-200"
        }`}
      >
        <div className="flex items-center">
          {message.role === "user" ? (
            <User size={16} className="mr-2 text-purple-400" />
          ) : (
            <Bot size={16} className="mr-2 text-purple-400" />
          )}
          <span className="text-xs font-medium">
            {message.role === "user" ? "You" : "AI Assistant"}
          </span>
        </div>
        <div className="mt-2 prose prose-invert prose-sm max-w-none">
          {isGenerating ? (
            <div className="animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            </div>
          ) : (
            <ReactMarkdown components={components}>
              {message.content}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
};
