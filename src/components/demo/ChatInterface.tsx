import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useDemoContext } from "@/contexts/DemoContext";
import { SendIcon, Loader2, Bot, RefreshCw } from "lucide-react";
import { MessageDisplay } from "@/components/demo/MessageDisplay";

export const ChatInterface: React.FC = () => {
  const {
    messages,
    inputMessage,
    setInputMessage,
    isLoading,
    isKeyValid,
    selectedModel,
    modelCategory,
    handleSendMessage,
    handleKeyPress,
    handleClearChat,
    messagesEndRef,
    generatingMessageId,
  } = useDemoContext();

  // Add state for the loading animation
  const [loadingIndicator, setLoadingIndicator] = useState("⠋ Thinking...");
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);

  // Set up the loading animation
  useEffect(() => {
    if (isLoading) {
      let loadingAnimationFrame = 0;
      const loadingAnimationFrames = [
        "⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏",
      ];

      // Only show loading indicator if there's no generating message
      if (!generatingMessageId) {
        setShowLoadingIndicator(true);
      } else {
        setShowLoadingIndicator(false);
      }

      const loadingAnimation = setInterval(() => {
        loadingAnimationFrame =
          (loadingAnimationFrame + 1) % loadingAnimationFrames.length;
        const animationChar = loadingAnimationFrames[loadingAnimationFrame];
        setLoadingIndicator(`${animationChar} Thinking...`);
      }, 100);

      return () => {
        clearInterval(loadingAnimation);
        setShowLoadingIndicator(false);
      };
    } else {
      setShowLoadingIndicator(false);
    }
  }, [isLoading, generatingMessageId]);

  return (
    <div className="bg-gray-900/70 rounded-xl border border-gray-800 backdrop-blur-sm flex-grow flex flex-col overflow-hidden">
      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-gray-500">
              <Bot size={40} className="mx-auto mb-2 text-gray-600" />
              <p>
                Enter your API key and select a model to start a conversation!
              </p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <MessageDisplay
              key={message.id}
              message={message}
              generatingMessageId={generatingMessageId}
              modelCategory={modelCategory}
            />
          ))
        )}
        
        {/* Only show loading indicator if explicitly set to show and no generating message */}
        {showLoadingIndicator && !generatingMessageId && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg p-3 bg-gray-800/70 text-gray-200">
              <div className="flex items-center">
                <Bot size={16} className="mr-2 text-purple-400" />
                <span className="text-xs font-medium">AI Assistant</span>
              </div>
              <div className="flex items-center mt-2">
                <span className="text-sm font-mono">{loadingIndicator}</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={handleClearChat}
            className="mr-2 bg-transparent border border-gray-700 hover:bg-gray-800 text-gray-400"
            title="Clear chat"
          >
            <RefreshCw size={18} />
          </Button>
          <Textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={
              isKeyValid ? "Type your message..." : "Enter API key to start..."
            }
            disabled={!isKeyValid || !selectedModel}
            className="bg-gray-800/50 border-0 focus:ring-1 focus:ring-purple-500 text-white min-h-[50px] resize-none"
          />
          <Button
            onClick={handleSendMessage}
            disabled={
              !isKeyValid || !selectedModel || !inputMessage.trim() || isLoading
            }
            className="ml-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {isLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <SendIcon size={18} />
            )}
          </Button>
        </div>
        {!isKeyValid && (
          <p className="text-xs text-gray-500 mt-2">
            Please enter your Hugging Face API key to use the demo
          </p>
        )}
        {isKeyValid && !selectedModel && (
          <p className="text-xs text-gray-500 mt-2">
            Select a model to start a conversation!
          </p>
        )}
      </div>
    </div>
  );
};
