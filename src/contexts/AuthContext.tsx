"use client";

import { AuthContextType, User } from "@/types/types";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Check for existing token and user data on mount
  useEffect(() => {
    // Only run this effect once
    if (isInitialized) return;

    const initAuth = async () => {
      try {
        if (typeof window !== "undefined") {
          const storedToken = localStorage.getItem("auth_token");
          const storedUser = localStorage.getItem("auth_user");

          if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        // Clear potentially corrupted data
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_user");
        }
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    initAuth();
  }, [isInitialized]);

  // Login function - use useCallback to prevent unnecessary re-renders
  const login = useCallback((newToken: string, newUser: User) => {
    // Save to state
    setToken(newToken);
    setUser(newUser);

    // Save to localStorage
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("auth_token", newToken);
        localStorage.setItem("auth_user", JSON.stringify(newUser));
      } catch (error) {
        console.error("Error saving auth data to localStorage:", error);
      }
    }
  }, []);

  // Logout function - use useCallback to prevent unnecessary re-renders
  const logout = useCallback(() => {
    // Clear state
    setToken(null);
    setUser(null);

    // Clear localStorage
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
      } catch (error) {
        console.error("Error removing auth data from localStorage:", error);
      }
    }
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = React.useMemo(
    () => ({
      user,
      token,
      isAuthenticated: !!token,
      isLoading,
      login,
      logout,
    }),
    [user, token, isLoading, login, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
