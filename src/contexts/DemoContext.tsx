"use client";

import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type ModelOption = {
  id: string;
  name: string;
  category: "creative" | "sentiment" | "conversation";
  description: string;
};

type DemoContextType = {
  apiKey: string;
  setApiKey: (key: string) => void;
  isKeyValid: boolean;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  messages: Message[];
  inputMessage: string;
  setInputMessage: (message: string) => void;
  isLoading: boolean;
  modelCategory: "creative" | "sentiment" | "conversation";
  setModelCategory: (category: "creative" | "sentiment" | "conversation") => void;
  modelOptions: ModelOption[];
  filteredModels: ModelOption[];
  validateApiKey: () => void;
  handleSendMessage: () => Promise<void>;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  handleClearChat: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
};

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const useDemoContext = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error("useDemoContext must be used within a DemoProvider");
  }
  return context;
};

export const DemoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [apiKey, setApiKey] = useState("");
  const [isKeyValid, setIsKeyValid] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modelCategory, setModelCategory] = useState<"creative" | "sentiment" | "conversation">("conversation");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Sample model options
  const modelOptions: ModelOption[] = [
    {
      id: "mistralai/Mistral-7B-Instruct-v0.2",
      name: "Mistral 7B Instruct",
      category: "conversation",
      description: "A powerful conversational model for general-purpose chat"
    },
    {
      id: "meta-llama/Llama-2-7b-chat-hf",
      name: "Llama 2 7B Chat",
      category: "conversation",
      description: "Meta's conversational assistant for helpful dialogues"
    },
    {
      id: "stabilityai/stablelm-tuned-alpha-7b",
      name: "StableLM Tuned Alpha",
      category: "creative",
      description: "Optimized for creative writing and storytelling"
    },
    {
      id: "PygmalionAI/pygmalion-6b",
      name: "Pygmalion 6B",
      category: "creative",
      description: "Specialized in creative and fictional content generation"
    },
    {
      id: "distilbert-base-uncased-finetuned-sst-2-english",
      name: "DistilBERT Sentiment",
      category: "sentiment",
      description: "Efficient model for sentiment analysis of text"
    },
    {
      id: "cardiffnlp/twitter-roberta-base-sentiment",
      name: "Twitter RoBERTa Sentiment",
      category: "sentiment",
      description: "Trained on tweets for accurate sentiment detection"
    }
  ];

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Filter models by category
  const filteredModels = modelOptions.filter(model => model.category === modelCategory);

  // Validate API key (mock validation)
  const validateApiKey = () => {
    // In a real app, you would verify this with Hugging Face API
    if (apiKey.length > 10) {
      setIsKeyValid(true);
      // Add a welcome message
      if (messages.length === 0) {
        setMessages([
          {
            role: "assistant",
            content: "Hello! I'm your AI assistant. Choose a model and start chatting with me. What would you like to discuss today?"
          }
        ]);
      }
    } else {
      setIsKeyValid(false);
    }
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !isKeyValid || !selectedModel) return;
    
    const userMessage: Message = {
      role: "user",
      content: inputMessage
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    
    try {
      // In a real app, you would call the Hugging Face API here
      // This is a mock response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let responseContent = "";
      const selectedModelObj = modelOptions.find(m => m.id === selectedModel);
      
      if (selectedModelObj?.category === "sentiment") {
        const sentiments = ["Positive", "Negative", "Neutral"];
        const randomSentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
        responseContent = `Sentiment Analysis Result: ${randomSentiment}\n\nThe text you provided appears to have a ${randomSentiment.toLowerCase()} sentiment. This analysis is based on the language patterns, word choice, and overall tone detected in your message.`;
      } else if (selectedModelObj?.category === "creative") {
        responseContent = `Here's a creative response to your prompt:\n\n${inputMessage.length > 20 ? inputMessage : "Once upon a time in a digital realm, AI and humans worked together to create amazing stories. Your journey begins now..."}\n\nFeel free to ask for more creative content or provide more specific prompts!`;
      } else {
        responseContent = `I understand you're asking about "${inputMessage.substring(0, 30)}${inputMessage.length > 30 ? '...' : ''}". As an AI assistant, I'm here to help with information and answers. What specific aspects would you like me to elaborate on?`;
      }
      
      const assistantMessage: Message = {
        role: "assistant",
        content: responseContent
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I'm sorry, there was an error generating a response. Please try again."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle key press (Enter to send)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Clear chat history
  // Add this to the handleClearChat function in DemoContext.tsx
  
  const handleClearChat = () => {
    setMessages([]);
    
    // If API key is valid, show welcome message
    if (isKeyValid) {
      setTimeout(() => {
        setMessages([
          {
            role: "assistant",
            content: "Hello! I'm your AI assistant. Choose a model and start chatting with me. What would you like to discuss today?"
          }
        ]);
      }, 100); // Small delay to ensure clear happens first
    }
  };

  const value = {
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
    messagesEndRef
  };

  return <DemoContext.Provider value={value as DemoContextType}>{children}</DemoContext.Provider>;
};