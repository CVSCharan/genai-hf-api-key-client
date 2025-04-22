import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendIcon, Loader2, Bot, RefreshCw } from "lucide-react";
import { DashboardMessageDisplay } from "@/components/dashboard/DashboardMessageDisplay";
import { DashboardChatInterfaceProps } from "@/types/types";

export const DashboardChatInterface: React.FC<DashboardChatInterfaceProps> = ({
  messages,
  onSendMessage,
  isModelSelected,
  isKeyValid = true,
  isLoading = false,
  onClearChat
}) => {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Add state for the loading animation
  const [loadingIndicator, setLoadingIndicator] = useState("⠋ Thinking...");
  const [generatingMessageId, setGeneratingMessageId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && isModelSelected) {
      onSendMessage(inputValue);
      setInputValue("");
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea as user types
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    
    // Auto-resize
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
  };

  // Set up the loading animation
  useEffect(() => {
    if (isLoading && !generatingMessageId) {
      let loadingAnimationFrame = 0;
      const loadingAnimationFrames = [
        "⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏",
      ];

      const loadingAnimation = setInterval(() => {
        loadingAnimationFrame =
          (loadingAnimationFrame + 1) % loadingAnimationFrames.length;
        const animationChar = loadingAnimationFrames[loadingAnimationFrame];
        setLoadingIndicator(`${animationChar} Thinking...`);
      }, 100);

      return () => clearInterval(loadingAnimation);
    }
  }, [isLoading, generatingMessageId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full relative">
      {/* Messages Area - Takes up all available space */}
      <div className="flex-grow overflow-y-auto pb-32">
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center min-h-[50vh]">
              <div className="text-center text-gray-500">
                <Bot size={40} className="mx-auto mb-2 text-gray-600" />
                <p>
                  Enter your API key and select a model to start a conversation!
                </p>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <DashboardMessageDisplay
                key={message.id}
                message={message}
                generatingMessageId={generatingMessageId}
                modelCategory="conversation"
              />
            ))
          )}
          {isLoading && !generatingMessageId && (
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
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto p-4">
          <form onSubmit={handleSubmit} className="flex items-end gap-2">
            {onClearChat && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={onClearChat}
                className="mb-1 bg-transparent border border-gray-700 hover:bg-gray-800 text-gray-400"
                title="Clear chat"
              >
                <RefreshCw size={18} />
              </Button>
            )}
            <div className="flex-grow relative">
              <Textarea
                ref={textareaRef}
                value={inputValue}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyPress}
                placeholder={
                  isKeyValid ? "Type your message..." : "Enter API key to start..."
                }
                disabled={!isKeyValid || !isModelSelected}
                className="bg-gray-800/50 border border-gray-700 focus:ring-1 focus:ring-purple-500 text-white min-h-[50px] max-h-[200px] resize-none rounded-lg pr-12"
                rows={1}
              />
              <Button
                type="submit"
                disabled={
                  !isKeyValid || !isModelSelected || !inputValue.trim() || isLoading
                }
                className="absolute right-2 bottom-2 p-2 h-auto rounded-md bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {isLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <SendIcon size={18} />
                )}
              </Button>
            </div>
          </form>
          {!isKeyValid && (
            <p className="text-xs text-gray-500 mt-2">
              Please enter your API key to use the chat
            </p>
          )}
          {isKeyValid && !isModelSelected && (
            <p className="text-xs text-gray-500 mt-2">
              Select a model to start a conversation!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};