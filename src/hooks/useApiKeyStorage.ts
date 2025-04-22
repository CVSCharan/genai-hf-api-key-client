import { useState, useEffect } from "react";

export function useApiKeyStorage(initialValue: string = "") {
  const [apiKey, setApiKey] = useState<string>(initialValue);
  const [hasExistingKey, setHasExistingKey] = useState<boolean>(false);

  // Load from localStorage on initial render
  useEffect(() => {
    const storedApiKey = localStorage.getItem("cvs-genai-user-hf-api-key");
    if (storedApiKey) {
      setApiKey(storedApiKey);
      setHasExistingKey(true);
    }
  }, []);

  // Function to save API key to localStorage
  const saveApiKey = (newApiKey: string) => {
    if (newApiKey) {
      // This will replace any existing key with the new one
      localStorage.setItem("cvs-genai-user-hf-api-key", newApiKey);
      setHasExistingKey(true);
    } else {
      localStorage.removeItem("cvs-genai-user-hf-api-key");
      setHasExistingKey(false);
    }
    setApiKey(newApiKey);
  };

  // Function to clear API key from localStorage
  const clearApiKey = () => {
    localStorage.removeItem("cvs-genai-user-hf-api-key");
    setApiKey("");
    setHasExistingKey(false);
  };

  // Function to check if an API key already exists
  const checkExistingKey = (): boolean => {
    return hasExistingKey;
  };

  return { apiKey, saveApiKey, clearApiKey, hasExistingKey, checkExistingKey };
}
