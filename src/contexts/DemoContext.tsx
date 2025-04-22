"use client";

import { DemoContextType, Message } from "@/types/types";
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  ReactNode,
} from "react";
import { useApiKeyStorage } from "@/hooks/useApiKeyStorage";
import { useRouter } from "next/navigation";
import CryptoJS from "crypto-js";
import { modelOptions } from "../data/modelOptions";
import { handleMessageResponse } from "../lib/messageHandlers";

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // State and hooks
  const router = useRouter();
  const { apiKey: storedApiKey, saveApiKey } = useApiKeyStorage();
  const [apiKey, setApiKey] = useState(storedApiKey || "");
  const [isKeyValid, setIsKeyValid] = useState(false);
  const [isDemo, setIsDemo] = useState(false);
  const [demoToken, setDemoToken] = useState("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [generatingMessageId, setGeneratingMessageId] = useState<string | null>(
    null
  );
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modelCategory, setModelCategory] = useState<
    "creative" | "sentiment" | "conversation"
  >("conversation");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize messageCount from localStorage or default to 0
  const [messageCount, setMessageCount] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const savedCount = localStorage.getItem("cvs-genai-demo-message-count");
      return savedCount ? parseInt(savedCount, 10) : 0;
    }
    return 0;
  });

  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  // API URL
  const apiUrl =
    `${process.env.NEXT_PUBLIC_API_URL}/huggingface` ||
    "http://localhost:4040/api/v1/huggingface";

  // Fetch demo user token
  const fetchDemoUser = async () => {
    const demoEmail = process.env.NEXT_PUBLIC_DEMO_USER_EMAIL;
    const demoPassword = process.env.NEXT_PUBLIC_DEMO_USER_PASSWORD;
    const demoApiUrl = process.env.NEXT_PUBLIC_API_URL;
    try {
      const response = await fetch(`${demoApiUrl}/local-auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: demoEmail,
          password: demoPassword,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch demo user");
      }
      const demoData = await response.json();
      setDemoToken(demoData.token);
    } catch (error) {
      console.error("Error fetching demo user:", error);
    }
  };

  // Load API key from storage on initial render
  useEffect(() => {
    if (storedApiKey) {
      setApiKey(storedApiKey);
      setIsDemo(storedApiKey.startsWith("hf"));
      validateApiKey(storedApiKey);
    }
  }, [storedApiKey]);

  // Fetch demo user on mount
  useLayoutEffect(() => {
    fetchDemoUser();
  }, []);

  // Reset conversation when model category, model, or API key changes
  useEffect(() => {
    // Reset selected model when category changes
    if (selectedModel) {
      const currentModelObj = modelOptions.find((m) => m.id === selectedModel);
      if (currentModelObj && currentModelObj.category !== modelCategory) {
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
        if (modelCategory === "conversation") {
          welcomeMessage = `Hello! I'm ${selectedModelObj.name}, a conversational AI assistant. How can I help you today?`;
        } else if (modelCategory === "creative") {
          welcomeMessage = `Hello! I'm ${selectedModelObj.name}, a creative writing assistant. I can help with stories, poems, or other creative content. What would you like me to write about?`;
        } else if (modelCategory === "sentiment") {
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
  }, [modelCategory, selectedModel, isKeyValid, modelOptions]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Filter models by category
  const filteredModels = modelOptions.filter(
    (model) => model.category === modelCategory
  );

  // Validate API key with option to pass a specific key
  const validateApiKey = (keyToValidate?: string) => {
    const keyToCheck = keyToValidate || apiKey;
    const isDemoKey = keyToCheck.startsWith("hf");
    setIsDemo(isDemoKey);

    if (keyToCheck.length > 10) {
      setIsKeyValid(true);

      if (keyToValidate) {
        saveApiKey(keyToValidate);
        setApiKey(keyToValidate);
      } else {
        saveApiKey(keyToCheck);
      }

      if (messages.length === 0) {
        setMessages([
          {
            role: "assistant",
            id: `assistant-${Date.now()}`,
            content:
              "Hello! I'm your AI assistant. Choose a model and start chatting with me. What would you like to discuss today?",
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

  // Handle API key submission
  const handleApiKeySubmit = (newApiKey: string) => {
    const isValid = validateApiKey(newApiKey);
    if (isValid) {
      router.push("/demo");
      return true;
    }
    return false;
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !isKeyValid || !selectedModel) return;

    // Check if user has reached message limit
    if (messageCount >= 3 && isDemo) {
      setShowLoginModal(true);
      return;
    }

    // Increment message count if using demo and save to localStorage
    if (isDemo) {
      const newCount = messageCount + 1;
      setMessageCount(newCount);
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "cvs-genai-demo-message-count",
          newCount.toString()
        );
      }
    }

    const userMessage: Message = {
      role: "user",
      content: inputMessage,
      id: `user-${Date.now()}`,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Create a placeholder for the assistant message
    const assistantMessageId = `assistant-${Date.now()}`;
    let assistantMessageAdded = false;

    try {
      const selectedModelObj = modelOptions.find((m) => m.id === selectedModel);
      if (!selectedModelObj) throw new Error("Model not found");

      const category = selectedModelObj.category;
      const endpoint = `${apiUrl}/${category}`;

      // Add the assistant message placeholder
      const assistantMessage: Message = {
        role: "assistant",
        content: "",
        id: assistantMessageId,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      assistantMessageAdded = true;
      setGeneratingMessageId(assistantMessageId);

      // Prepare the request payload with encrypted API key
      const encryptionKey =
        process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "default-secret-key";
      const encryptedApiKey = CryptoJS.AES.encrypt(
        apiKey,
        encryptionKey
      ).toString();

      // Define payload type to allow additional properties
      type PayloadType = {
        prompt?: string;
        message?: string;
        model: string;
        maxLength: string;
        temperature: number;
        apiKey: string;
        past_user_inputs?: string[];
        generated_responses?: string[];
      };

      // Prepare the base payload
      const payload: PayloadType = {
        model: selectedModel,
        maxLength: "",
        temperature: 0.7,
        apiKey: encryptedApiKey,
      };

      // Add category-specific payload properties
      if (category === "conversation") {
        // For conversational models, use message format with history
        payload.message = inputMessage;
        payload.past_user_inputs = messages
          .filter((msg) => msg.role === "user")
          .map((msg) => msg.content);
        payload.generated_responses = messages
          .filter(
            (msg) => msg.role === "assistant" && msg.id !== assistantMessageId
          )
          .map((msg) => msg.content);
      } else {
        // For other categories, use prompt format
        payload.prompt = inputMessage;
      }

      // Make the API call
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${demoToken}`,
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      // Process the response based on model category
      const responseContent = handleMessageResponse(
        data,
        category,
        inputMessage
      );

      // Update the assistant message with the response content
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId
            ? { ...msg, content: typeof responseContent === 'string' ? responseContent : JSON.stringify(responseContent) }
            : msg
        )
      );

      // Keep the generating state for a short time to show the animation
      setTimeout(() => {
        setGeneratingMessageId(null);
      }, 2000);
    } catch (error) {
      console.error("Error generating response:", error);
      
      if (assistantMessageAdded) {
        // Update the existing assistant message with error content
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? {
                  ...msg,
                  content: `# Error Occurred\n\nI'm sorry, The server is busy.\n\nPlease try again or check your API key and connection.`,
                  id: `error-${Date.now()}`,
                }
              : msg
          )
        );
      } else {
        // Add a new error message if the assistant message wasn't added
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `# Error Occurred\n\nI'm sorry, The server is busy.\n\nPlease try again or check your API key and connection.`,
            id: `error-${Date.now()}`,
            timestamp: new Date(),
          },
        ]);
      }
      
      // Clear the generating message ID
      setGeneratingMessageId(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle key press (Enter to send)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Clear chat history
  const handleClearChat = () => {
    if (isKeyValid && selectedModel) {
      // If a model is selected, use model-specific welcome message
      const selectedModelObj = modelOptions.find((m) => m.id === selectedModel);
      let welcomeMessage =
        "Hello! I'm your AI assistant. What would you like to discuss today?";

      if (selectedModelObj) {
        if (modelCategory === "conversation") {
          welcomeMessage = `Hello! I'm ${selectedModelObj.name}, a conversational AI assistant. How can I help you today?`;
        } else if (modelCategory === "creative") {
          welcomeMessage = `Hello! I'm ${selectedModelObj.name}, a creative writing assistant. I can help with stories, poems, or other creative content. What would you like me to write about?`;
        } else if (modelCategory === "sentiment") {
          welcomeMessage = `Hello! I'm ${selectedModelObj.name}, a sentiment analysis model. Share some text with me, and I'll analyze its emotional tone and sentiment.`;
        }
      }

      setMessages([
        {
          role: "assistant",
          content: welcomeMessage,
          id: `assistant-welcome-${Date.now()}`,
          timestamp: new Date(),
        },
      ]);
    } else if (isKeyValid) {
      // Generic message if API key is valid but no model selected
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
  };

  // Context value
  const value = React.useMemo(
    () => ({
      apiKey,
      setApiKey,
      isKeyValid,
      isDemo,
      setIsDemo,
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
      handleApiKeySubmit,
      handleSendMessage,
      handleKeyPress,
      handleClearChat,
      messagesEndRef,
      generatingMessageId,
      messageCount,
      showLoginModal,
    }),
    [
      apiKey,
      isKeyValid,
      isDemo,
      selectedModel,
      messages,
      inputMessage,
      isLoading,
      modelCategory,
      modelOptions,
      filteredModels,
      messageCount,
    ]
  );

  return (
    <DemoContext.Provider value={value as DemoContextType}>
      {children}
    </DemoContext.Provider>
  );
};

export const useDemoContext = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error("useDemoContext must be used within a DemoProvider");
  }
  return context;
};
