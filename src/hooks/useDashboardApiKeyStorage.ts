import { useState, useEffect } from "react";

export function useDashboardApiKeyStorage(initialValue: string = "") {
  const [userApiKey, setUserApiKey] = useState<string>(initialValue);
  const [userExistingKey, setUserExistingKey] = useState<boolean>(false);

  // Load from localStorage on initial render
  useEffect(() => {
    const storedApiKey = localStorage.getItem("cvs-genai-user-hf-api-key");
    if (storedApiKey) {
      setUserApiKey(storedApiKey);
      setUserExistingKey(true);
    }
  }, []);

  // Function to save API key to localStorage
  const saveUserApiKey = (newApiKey: string) => {
    if (newApiKey) {
      // This will replace any existing key with the new one
      localStorage.setItem("cvs-genai-user-hf-api-key", newApiKey);
      setUserExistingKey(true);
    } else {
      localStorage.removeItem("cvs-genai-user-hf-api-key");
      setUserExistingKey(false);
    }
    setUserApiKey(newApiKey);
  };

  // Function to clear API key from localStorage
  const clearUserApiKey = () => {
    localStorage.removeItem("cvs-genai-user-hf-api-key");
    setUserApiKey("");
    setUserExistingKey(false);
  };

  // Function to check if an API key already exists
  const checkUserExistingKey = (): boolean => {
    return userExistingKey;
  };

  return {
    userApiKey,
    saveUserApiKey,
    clearUserApiKey,
    userExistingKey,
    checkUserExistingKey,
  };
}
