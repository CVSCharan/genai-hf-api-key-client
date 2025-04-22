import React, { useState, useEffect } from "react";
import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { MessageDisplayProps, SentimentResult } from "@/types/types";

export const MessageDisplay: React.FC<MessageDisplayProps> = ({
  message,
  generatingMessageId,
  modelCategory,
}) => {
  // Add state for the loading animation
  const [loadingIndicator, setLoadingIndicator] = useState("⠋ Thinking...");

  // Set up the loading animation
  useEffect(() => {
    if (message.id === generatingMessageId) {
      let loadingAnimationFrame = 0;
      const loadingAnimationFrames = [
        "⠋",
        "⠙",
        "⠹",
        "⠸",
        "⠼",
        "⠴",
        "⠦",
        "⠧",
        "⠇",
        "⠏",
      ];

      const loadingAnimation = setInterval(() => {
        loadingAnimationFrame =
          (loadingAnimationFrame + 1) % loadingAnimationFrames.length;
        const animationChar = loadingAnimationFrames[loadingAnimationFrame];
        setLoadingIndicator(`${animationChar} Thinking..!`);
      }, 100);

      return () => clearInterval(loadingAnimation);
    }
  }, [message.id, generatingMessageId]);

  // Helper function to determine if content is a sentiment result
  const isSentimentResult = (content: any): content is SentimentResult => {
    return (
      content &&
      typeof content === "object" &&
      content.originalText &&
      content.primarySentiment &&
      content.allSentiments
    );
  };

  // Helper function to extract text from conversational response
  const extractConversationalText = (content: any): string => {
    if (typeof content === "string") {
      return content;
    }

    // Handle the specific format from the server
    if (content && typeof content === "object") {
      // If it's the raw API response with "response" field
      if (content.response && typeof content.response === "string") {
        return content.response;
      }

      // Check for nested conversation structure
      if (content.conversation && content.conversation.generated_responses) {
        const responses = content.conversation.generated_responses;
        if (Array.isArray(responses) && responses.length > 0) {
          return responses[responses.length - 1];
        }
      }

      // If it's already been processed but is still an object
      return JSON.stringify(content);
    }

    return "Unable to display response";
  };

  // Render content based on model category and message role
  const renderContent = () => {
    // For user messages, simply display the content as text
    if (message.role === "user") {
      return (
        <div>
          {typeof message.content === "string"
            ? message.content
            : JSON.stringify(message.content)}
        </div>
      );
    }

    // For assistant messages that are currently generating
    if (message.id === generatingMessageId) {
      return <div className="font-mono">{loadingIndicator}</div>;
    }

    // For completed assistant messages, render based on model category
    switch (modelCategory) {
      case "sentiment":
        if (isSentimentResult(message.content)) {
          return <SentimentDisplay content={message.content} />;
        }
        break;

      case "creative":
        // Creative writing responses might be objects with 'generated_text'
        let creativeContent = "";
        if (typeof message.content === "string") {
          creativeContent = message.content;
        } else if (
          message.content &&
          typeof message.content === "object" &&
          "generated_text" in message.content &&
          typeof (message.content as { generated_text?: string }).generated_text === "string"
        ) {
          // Extract text from the 'generated_text' field
          creativeContent = (message.content as { generated_text: string }).generated_text;
        } else if (
          message.content &&
          typeof message.content === "object" &&
          "response" in message.content && // Added check for 'response' field
          typeof (message.content as { response?: string }).response === "string"
        ) {
           // Fallback for potential 'response' field structure
          creativeContent = (message.content as { response: string }).response;
        } else {
          // Fallback: stringify if it's an object but not the expected structure
          creativeContent = JSON.stringify(message.content);
        }
        return (
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown>{creativeContent}</ReactMarkdown>
          </div>
        );

      case "conversation":
        // Conversational responses may need extraction from complex objects
        return (
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown>
              {extractConversationalText(message.content)}
            </ReactMarkdown>
          </div>
        );
    }

    // Fallback for any unhandled cases
    return (
      <div className="prose prose-invert max-w-none">
        {typeof message.content === "string" ? (
          <ReactMarkdown>{message.content}</ReactMarkdown>
        ) : (
          JSON.stringify(message.content, null, 2)
        )}
      </div>
    );
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
            ? "bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-white"
            : "bg-gray-800/70 text-gray-200"
        }`}
      >
        <div className="flex items-center mb-1">
          {message.role === "assistant" ? (
            <Bot size={16} className="mr-2 text-purple-400" />
          ) : (
            <User size={16} className="mr-2 text-pink-400" />
          )}
          <span className="text-xs font-medium">
            {message.role === "user" ? "You" : "AI Assistant"}
          </span>
        </div>
        <div className="whitespace-pre-wrap">{renderContent()}</div>
      </div>
    </div>
  );
};

// Component to display sentiment analysis results
const SentimentDisplay: React.FC<{ content: SentimentResult }> = ({
  content,
}) => {
  return (
    <div className="sentiment-analysis-results">
      <h2 className="text-xl font-bold mb-3">Sentiment Analysis Results</h2>
      <p className="mb-3">
        <span className="font-medium">Text analyzed:</span>{" "}
        {content.originalText}
      </p>
      <div className="mb-4">
        <p className="font-medium mb-1">Primary sentiment:</p>
        <div className="bg-gray-700/50 p-2 rounded-md inline-block">
          <span className="font-bold">{content.primarySentiment.label}</span>
          <span className="ml-2 text-sm">
            ({content.primarySentiment.confidence})
          </span>
        </div>
      </div>
      <div>
        <p className="font-medium mb-2">All sentiments:</p>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-700/50">
              <th className="text-left p-2 rounded-tl-md">Sentiment</th>
              <th className="text-right p-2 rounded-tr-md">Confidence</th>
            </tr>
          </thead>
          <tbody>
            {content.allSentiments.map((item, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0 ? "bg-gray-800/30" : "bg-gray-800/10"
                }
              >
                <td className="p-2">{item.sentiment}</td>
                <td className="text-right p-2">{item.confidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
