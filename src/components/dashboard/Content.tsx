import { DashboardChatInterface } from "./DashboardChatInterface";
import { useEffect, useState } from "react";
import { useDashboard } from "@/contexts/DashboardContext";
import { SparklesCore } from "../ui/aceternity/sparkles";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Sidebar from "./Sidebar";
import { DashboardApiKeyInput } from "./DashboardApiKeyInput";
import { DashboardModelSelector } from "./DashboardModelSelector";
import { useDashboardApiKeyStorage } from "@/hooks/useDashboardApiKeyStorage";

const DashboardContent: React.FC = () => {
  const {
    chatSessions,
    activeChatId,
    apiKey,
    setApiKey,
    createNewChat,
    selectChat,
    deleteChat,
    setModelCategory,
    setModel,
    isModelSelectionLocked,
    getActiveChat,
    sendMessage,
    clearChat,
    renameChat,
  } = useDashboard();
  const { userApiKey, saveUserApiKey } = useDashboardApiKeyStorage();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [tempApiKey, setTempApiKey] = useState("");

  // Check for existing API key and set it in the dashboard context
  useEffect(() => {
    if (userApiKey) {
      // If we have a key in storage, set it in the context
      setApiKey(userApiKey);
      // Make sure the modal is closed
      setShowApiKeyModal(false);
    } else {
      // Only show the modal if there's no key at all
      setShowApiKeyModal(true);
    }
  }, [userApiKey, setApiKey]);

  // Create a new chat if none exists
  useEffect(() => {
    if (chatSessions.length === 0) {
      createNewChat();
    }
  }, [chatSessions.length, createNewChat]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Get the active chat
  const activeChat = getActiveChat();

  // Handle model category selection
  const handleCategoryChange = (category: string) => {
    if (activeChatId && !isModelSelectionLocked(activeChatId)) {
      setModelCategory(activeChatId, category);
    }
  };

  // Handle model selection
  const handleModelChange = (modelId: string) => {
    if (activeChatId && !isModelSelectionLocked(activeChatId)) {
      setModel(activeChatId, modelId);
    }
  };

  // Handle sending a message using the context's sendMessage function
  const handleSendMessage = async (content: string) => {
    if (activeChatId) {
      setIsLoading(true);

      try {
        await sendMessage(activeChatId, content);
      } catch (error) {
        console.error("Error sending message:", error);
        setIsLoading(false);
      }
    }
  };

  // Handle clearing chat using the context's clearChat function
  const handleClearChat = () => {
    if (activeChatId) {
      clearChat(activeChatId);
    }
  };

  // Handle saving API key from modal
  const handleSaveApiKey = () => {
    if (tempApiKey.trim()) {
      saveUserApiKey(tempApiKey.trim());
      setApiKey(tempApiKey.trim());
      setShowApiKeyModal(false);
    }
  };

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* Background sparkles effect */}
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={30}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      {/* API Key Modal */}
      <Dialog
        open={showApiKeyModal}
        onOpenChange={(open) => {
          // Only allow closing if we have an API key or if we're opening the modal
          if (!open && !apiKey) return;
          setShowApiKeyModal(open);
        }}
      >
        <DialogContent className="bg-[#111827] border border-gray-800 text-white max-w-md p-0 overflow-hidden">
          <div className="p-6">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-xl font-bold text-white">
                Enter Your API Key
              </DialogTitle>
              <DialogDescription className="text-gray-400 mt-2">
                Provide your Hugging Face API key to start using GenAI
                capabilities.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <Input
                type="password"
                placeholder="Enter your Hugging Face API Key"
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
                className="bg-[#1e293b] border border-gray-700 text-white h-12 rounded-md"
              />
            </div>

            <Button
              onClick={handleSaveApiKey}
              disabled={!tempApiKey.trim()}
              className="cursor-pointer w-full h-12 mt-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md"
            >
              Continue to GenAI Platform
            </Button>

            <div className="flex justify-center space-x-4 mt-6 text-sm">
              <a
                href="/docs?section=api-key"
                target="_blank"
                className="text-purple-400 hover:text-purple-300 transition-colors underline"
              >
                How to get an API key?
              </a>
              <a
                href="https://huggingface.co/settings/tokens"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 hover:text-pink-300 transition-colors underline"
              >
                Visit Hugging Face?
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sidebar Component */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
        chatSessions={chatSessions}
        activeChat={activeChat}
        selectChat={selectChat}
        createNewChat={createNewChat}
        deleteChat={deleteChat}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <div className="p-4 border-b border-gray-800 bg-gray-900/70 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              {activeChat?.title || "New Chat"}
            </h1>
            {activeChat && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const newTitle = prompt(
                    "Enter new chat title:",
                    activeChat.title
                  );
                  if (newTitle && activeChatId) {
                    renameChat(activeChatId, newTitle);
                  }
                }}
                className="text-gray-400 hover:text-white"
              >
                Rename
              </Button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col">
          {/* API Key and Model Selection */}
          <div className="bg-gray-900/70 border-b border-gray-800 p-4 backdrop-blur-sm">
            <div className="max-w-5xl mx-auto w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <DashboardApiKeyInput
                  value={apiKey}
                  onChange={(newKey) => {
                    setApiKey(newKey);
                    saveUserApiKey(newKey);
                  }}
                />

                <DashboardModelSelector
                  isDisabled={
                    !activeChatId || isModelSelectionLocked(activeChatId)
                  }
                  selectedCategory={activeChat?.modelCategory || ""}
                  selectedModel={activeChat?.modelId || ""}
                  onCategoryChange={handleCategoryChange}
                  onModelChange={handleModelChange}
                />
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="flex-1 overflow-hidden">
            <DashboardChatInterface
              messages={activeChat?.messages || []}
              onSendMessage={handleSendMessage}
              isModelSelected={!!activeChat?.modelId}
              isKeyValid={!!apiKey}
              isLoading={isLoading}
              onClearChat={handleClearChat}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
