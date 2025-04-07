import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SparklesCore } from "@/components/ui/aceternity/sparkles";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useDemoContext } from "@/contexts/DemoContext";
import { TourStep } from "@/components/demo/TourStep";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SendIcon,
  Loader2,
  KeyRound,
  Bot,
  User,
  RefreshCw,
} from "lucide-react";

const DemoContent = () => {
  const {
    apiKey,
    setApiKey,
    isKeyValid,
    selectedModel,
    setSelectedModel,
    messages,
    inputMessage,
    setInputMessage,
    isLoading,
    modelCategory,
    setModelCategory,
    modelOptions,
    filteredModels,
    validateApiKey,
    handleSendMessage,
    handleKeyPress,
    handleClearChat,
    messagesEndRef,
  } = useDemoContext();

  // Tour state
  const [tourStep, setTourStep] = useState<number | null>(null);
  const [hasSeenTour, setHasSeenTour] = useState(false);

  // Initialize tour on first render
  useEffect(() => {
    const tourSeen = localStorage.getItem("genai-demo-tour-seen");
    if (!tourSeen) {
      setTourStep(1);
      setHasSeenTour(false);
    } else {
      setHasSeenTour(true);
    }
  }, []);

  // Close tour
  const closeTour = () => {
    setTourStep(null);
    localStorage.setItem("genai-demo-tour-seen", "true");
    setHasSeenTour(true);
  };

  // Next tour step
  const nextTourStep = () => {
    if (tourStep && tourStep < 3) {
      setTourStep(tourStep + 1);
    } else {
      closeTour();
    }
  };

  // Reset conversation when model category, model, or API key changes
  useEffect(() => {
    handleClearChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelCategory, selectedModel, apiKey]);

  // References for tour elements
  const apiKeyRef = React.useRef<HTMLDivElement>(null);
  const categoryRef = React.useRef<HTMLDivElement>(null);
  const modelRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />

      {/* Background sparkles effect */}
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={50}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      {/* Tour Steps - Moved outside of the form elements to ensure they're visible */}
      {tourStep === 1 && (
        <TourStep
          step={1}
          title="Enter API Key"
          description="Start by entering your Hugging Face API key and click the key button to validate it."
          position="bottom"
          onClose={(skipAll) => (skipAll ? closeTour() : nextTourStep())}
        />
      )}
      {tourStep === 2 && (
        <TourStep
          step={2}
          title="Choose Category"
          description="Select a model category based on what you want to do: have a conversation, generate creative content, or analyze sentiment."
          position="bottom"
          onClose={(skipAll) => (skipAll ? closeTour() : nextTourStep())}
        />
      )}
      {tourStep === 3 && (
        <TourStep
          step={3}
          title="Select Model"
          description="Finally, choose a specific model to start your conversation. Different models have different capabilities."
          position="bottom"
          onClose={(skipAll) => (skipAll ? closeTour() : closeTour())}
        />
      )}

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10 flex-grow flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto w-full flex-grow flex flex-col"
        >
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-2">
              GenAI Demo Playground
            </h1>
            <p className="text-gray-400 text-base max-w-2xl mx-auto">
              Test different Hugging Face models with your API key
            </p>
            {hasSeenTour && (
              <button
                onClick={() => setTourStep(1)}
                className="text-underline cursor-pointer mt-2 text-sm text-purple-400 hover:text-purple-300"
              >
                How it works?
              </button>
            )}
          </div>

          {/* API Key and Model Selection */}
          <div className="bg-gray-900/70 rounded-xl p-4 mb-4 backdrop-blur-sm border border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2 relative" ref={apiKeyRef}>
                <label className="text-sm font-medium text-gray-300">
                  Your Hugging Face API Key
                </label>
                <div className="flex">
                  <Input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your API key"
                    className="bg-gray-800/50 border-0 focus:ring-1 focus:ring-purple-500 text-white rounded-l-md"
                  />
                  <Button
                    onClick={() => {
                      validateApiKey();
                      if (tourStep === 1) nextTourStep();
                    }}
                    className={`bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-l-none ${
                      tourStep === 1
                        ? "ring-2 ring-purple-300 ring-opacity-70 animate-pulse"
                        : ""
                    }`}
                  >
                    <KeyRound size={18} />
                  </Button>
                </div>
                {/* Removed the TourStep from here */}
              </div>

              <div className="space-y-2 relative" ref={categoryRef}>
                <label className="text-sm font-medium text-gray-300">
                  Model Category
                </label>
                <Select
                  value={modelCategory}
                  onValueChange={(value: any) => {
                    setModelCategory(value);
                    setSelectedModel("");
                    if (tourStep === 2) nextTourStep();
                  }}
                >
                  <SelectTrigger
                    className={`bg-gray-800/50 border-0 focus:ring-1 focus:ring-purple-500 text-white ${
                      tourStep === 2
                        ? "ring-2 ring-purple-300 ring-opacity-70 animate-pulse"
                        : ""
                    }`}
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border border-gray-700 text-white">
                    <SelectItem value="conversation">Conversational</SelectItem>
                    <SelectItem value="creative">Creative Writing</SelectItem>
                    <SelectItem value="sentiment">
                      Sentiment Analysis
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 relative" ref={modelRef}>
                <label className="text-sm font-medium text-gray-300">
                  Select Model
                </label>
                <Select
                  value={selectedModel}
                  onValueChange={(value) => {
                    setSelectedModel(value);
                    if (tourStep === 3) closeTour();
                  }}
                  disabled={!isKeyValid}
                >
                  <SelectTrigger
                    className={`bg-gray-800/50 border-0 focus:ring-1 focus:ring-purple-500 text-white ${
                      tourStep === 3
                        ? "ring-2 ring-purple-300 ring-opacity-70 animate-pulse"
                        : ""
                    }`}
                  >
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border border-gray-700 text-white">
                    {filteredModels.map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        {model.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* Removed the TourStep from here */}
              </div>
            </div>

            {selectedModel && (
              <div className="mt-2 text-sm text-gray-400">
                {modelOptions.find((m) => m.id === selectedModel)?.description}
              </div>
            )}
          </div>

          {/* Chat Interface */}
          <div className="bg-gray-900/70 rounded-xl border border-gray-800 backdrop-blur-sm flex-grow flex flex-col overflow-hidden">
            {/* Messages Area */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Bot size={40} className="mx-auto mb-2 text-gray-600" />
                    <p>
                      Enter your API key and select a model to start chatting
                    </p>
                  </div>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
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
                      <div className="whitespace-pre-wrap">
                        {message.content}
                      </div>
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg p-3 bg-gray-800/70 text-gray-200">
                    <div className="flex items-center">
                      <Bot size={16} className="mr-2 text-purple-400" />
                      <span className="text-xs font-medium">AI Assistant</span>
                    </div>
                    <div className="flex items-center mt-2">
                      <Loader2
                        size={16}
                        className="animate-spin text-purple-400 mr-2"
                      />
                      <span className="text-sm">Generating response...</span>
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
                    isKeyValid
                      ? "Type your message..."
                      : "Enter API key to start..."
                  }
                  disabled={!isKeyValid || !selectedModel}
                  className="bg-gray-800/50 border-0 focus:ring-1 focus:ring-purple-500 text-white min-h-[50px] resize-none"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={
                    !isKeyValid ||
                    !selectedModel ||
                    !inputMessage.trim() ||
                    isLoading
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
                  Select a model to start chatting
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default DemoContent;
