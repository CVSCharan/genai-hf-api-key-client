"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
} from "react";
import { useRouter } from "next/navigation";
import { useApiKeyStorage } from "@/hooks/useApiKeyStorage";
import { ApiKeyModalContextType } from "@/types/types";

const ApiKeyModalContext = createContext<ApiKeyModalContextType | undefined>(
  undefined
);

export const useApiKeyModal = () => {
  const context = useContext(ApiKeyModalContext);
  if (!context) {
    throw new Error(
      "useApiKeyModal must be used within an ApiKeyModalProvider"
    );
  }
  return context;
};

export const ApiKeyModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { apiKey: storedApiKey, saveApiKey } = useApiKeyStorage();
  const [apiKey, setApiKey] = useState(storedApiKey || "");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sourceSection, setSourceSection] = useState<string>("hero");
  const router = useRouter();

  // Track scroll position when modal opens
  const scrollPositionRef = useRef<number>(0);

  const openModal = () => {
    // Store current scroll position
    scrollPositionRef.current = window.scrollY;
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);

    // Restore scroll position after modal closes
    setTimeout(() => {
      window.scrollTo({
        top: scrollPositionRef.current,
        behavior: "auto",
      });
    }, 50);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save API key to localStorage
    saveApiKey(apiKey);
    console.log("API Key saved to localStorage:", apiKey);
    closeModal(); // Close modal after submission
    router.push("/demo");
  };

  return (
    <ApiKeyModalContext.Provider
      value={{
        isModalOpen,
        openModal,
        closeModal,
        apiKey,
        setApiKey,
        handleSubmit,
        sourceSection,
        setSourceSection,
      }}
    >
      {children}
    </ApiKeyModalContext.Provider>
  );
};
