"use client";

import { useDashboardApiKeyStorage } from "@/hooks/useDashboardApiKeyStorage";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { modelOptions } from "../data/modelOptions";
import { ChatSession, DashboardContextType, Message } from "@/types/types";

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { userApiKey, saveUserApiKey } = useDashboardApiKeyStorage();
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedModelCategory, setSelectedModelCategory] = useState<
    "creative" | "sentiment" | "conversation"
  >("conversation");
  const [isLoading, setIsLoading] = useState(false);
  const [isKeyValid, setIsKeyValid] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (userApiKey) {
      setApiKey(userApiKey);
      validateApiKey(userApiKey);
    }
  }, [userApiKey]);

  // Reset conversation when model category, model, or API key changes
  useEffect(() => {
    // Reset selected model when category changes
    if (selectedModel) {
      const currentModelObj = modelOptions.find((m) => m.id === selectedModel);
      if (
        currentModelObj &&
        currentModelObj.category !== selectedModelCategory
      ) {
        // If the current model doesn't match the new category, clear it
        setSelectedModel("");
        return; // Exit early - another useEffect call will happen when selectedModel is cleared
      }
    }

    if (selectedModel && isKeyValid) {
      const selectedModelObj = modelOptions.find((m) => m.id === selectedModel);
      let welcomeMessage =
        "Hello! I'm your AI assistant. What would you like to discuss today?";

      if (selectedModelObj) {
        if (selectedModelCategory === "conversation") {
          welcomeMessage = `Hello! I'm ${selectedModelObj.name}, a conversational AI assistant. How can I help you today?`;
        } else if (selectedModelCategory === "creative") {
          welcomeMessage = `Hello! I'm ${selectedModelObj.name}, a creative writing assistant. I can help with stories, poems, or other creative content. What would you like me to write about?`;
        } else if (selectedModelCategory === "sentiment") {
          welcomeMessage = `Hello! I'm ${selectedModelObj.name}, a sentiment analysis model. Share some text with me, and I'll analyze its emotional tone and sentiment.`;
        }
      }

      // Directly set the messages without calling handleClearChat
      setMessages([
        {
          role: "assistant",
          content: welcomeMessage,
          id: `assistant-welcome-${Date.now()}`,
          timestamp: new Date(),
        },
      ]);
    } else if (isKeyValid) {
      // Only show generic message if API key is valid but no model selected
      setMessages([
        {
          role: "assistant",
          content:
            "Hello! I'm your AI assistant. Choose a model and start chatting with me. What would you like to discuss today?",
          id: `assistant-welcome-${Date.now()}`,
          timestamp: new Date(),
        },
      ]);
    } else {
      // Clear messages if API key is not valid
      setMessages([]);
    }
  }, [selectedModelCategory, selectedModel, isKeyValid, modelOptions]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Filter models by category
  const availableModels = modelOptions.filter(
    (model) => model.category === selectedModelCategory
  );

  // Handle API key submission
  const handleApiKeySubmit = (newApiKey: string) => {
    const isValid = validateApiKey(newApiKey);
    if (isValid) {
      return true;
    }
    return false;
  };

  // Validate API key with option to pass a specific key
  const validateApiKey = (keyToValidate?: string) => {
    const keyToCheck = keyToValidate || apiKey;
    const isValidKey = keyToCheck.startsWith("hf");

    if (keyToCheck.length > 10) {
      setIsKeyValid(true);

      if (keyToValidate && isValidKey) {
        saveUserApiKey(keyToValidate);
        setApiKey(keyToValidate);
      } else {
        saveUserApiKey(keyToCheck);
      }

      if (messages.length === 0) {
        setMessages([
          {
            role: "assistant",
            content:
              "Hello! I'm your AI assistant. Choose a model and start chatting with me. What would you like to discuss today?",
            id: `assistant-${Date.now()}`,
            timestamp: new Date(),
          },
        ]);
      }

      return true;
    } else {
      setIsKeyValid(false);
      return false;
    }
  };

  // Create a new chat session
  const createNewChat = () => {
    const newChatId = Date.now().toString();
    const newChat: ChatSession = {
      id: newChatId,
      title: "New Chat",
      modelCategory: "",
      modelId: null,
      messages: [],
      createdAt: new Date(),
    };

    setChatSessions((prev) => [newChat, ...prev]);
    setActiveChatId(newChatId);
  };

  // Select an existing chat
  const selectChat = (id: string) => {
    setActiveChatId(id);
  };

  // Delete a chat
  const deleteChat = (id: string) => {
    setChatSessions((prev) => prev.filter((chat) => chat.id !== id));

    // If we deleted the active chat, select the first available chat or null
    if (activeChatId === id) {
      const remainingChats = chatSessions.filter((chat) => chat.id !== id);
      setActiveChatId(remainingChats.length > 0 ? remainingChats[0].id : null);
    }
  };

  // Set model category for a chat
  const setModelCategory = (chatId: string, category: string) => {
    setChatSessions((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? { ...chat, modelCategory: category, modelId: null }
          : chat
      )
    );
  };

  // Set specific model for a chat
  const setModel = (chatId: string, modelId: string) => {
    setChatSessions((prev) =>
      prev.map((chat) => (chat.id === chatId ? { ...chat, modelId } : chat))
    );
  };

  // Add a message to a chat
  const addMessage = (
    chatId: string,
    message: Omit<Message, "id" | "timestamp">
  ) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };

    setChatSessions((prev) =>
      prev.map((chat) => {
        if (chat.id === chatId) {
          // Update chat title based on first user message if it's still "New Chat"
          let updatedChat = { ...chat };

          if (chat.title === "New Chat" && message.role === "user") {
            // Use first 30 chars of first message as title
            const newTitle =
              message.content.length > 30
                ? `${message.content.substring(0, 30)}...`
                : message.content;
            updatedChat.title = newTitle;
          }

          // Add the message
          updatedChat.messages = [...chat.messages, newMessage];
          return updatedChat;
        }
        return chat;
      })
    );
  };

  // Check if model selection should be locked (has messages)
  const isModelSelectionLocked = (chatId: string) => {
    const chat = chatSessions.find((c) => c.id === chatId);
    return chat ? chat.messages.length > 0 : false;
  };

  // Get the active chat
  const getActiveChat = () => {
    return chatSessions.find((chat) => chat.id === activeChatId) || null;
  };

  // Send a message and get a response
  const sendMessage = async (chatId: string, content: string) => {
    // First add the user message
    const userMessage: Omit<Message, "id" | "timestamp"> = {
      role: "user",
      content,
    };

    addMessage(chatId, userMessage);

    // Get the chat to check if it has a model selected
    const chat = chatSessions.find((c) => c.id === chatId);
    if (!chat || !chat.modelId) {
      throw new Error("No model selected for this chat");
    }

    try {
      // In a real implementation, you would call your API here
      // For now, we'll simulate a response after a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Add the assistant response
      const assistantMessage: Omit<Message, "id" | "timestamp"> = {
        role: "assistant",
        content: `This is a response to: "${content}"`,
      };

      addMessage(chatId, assistantMessage);
    } catch (error) {
      console.error("Error sending message:", error);
      // Add an error message
      addMessage(chatId, {
        role: "system",
        content: "Sorry, there was an error processing your request.",
      });
      throw error;
    }
  };

  // Clear all messages in a chat
  const clearChat = (chatId: string) => {
    setChatSessions((prev) =>
      prev.map((chat) => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: [],
            title: "New Chat",
          };
        }
        return chat;
      })
    );
  };

  // Rename a chat
  const renameChat = (chatId: string, newTitle: string) => {
    setChatSessions((prev) =>
      prev.map((chat) => {
        if (chat.id === chatId) {
          return {
            ...chat,
            title: newTitle,
          };
        }
        return chat;
      })
    );
  };

  // Context value
  const value = React.useMemo(
    () => ({
      chatSessions,
      activeChatId,
      apiKey,
      setApiKey,
      createNewChat,
      selectChat,
      deleteChat,
      setModelCategory,
      setModel,
      availableModels,
      addMessage,
      isModelSelectionLocked,
      getActiveChat,
      sendMessage,
      clearChat,
      renameChat,
    }),
    [chatSessions, activeChatId, apiKey]
  );

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
