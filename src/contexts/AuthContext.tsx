"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { AuthContextType, LoginProps, User } from "@/types/types";

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  // Check for existing token on mount
  useEffect(() => {
    const storedToken = Cookies.get("genai_user_token");
    const storedUserData = Cookies.get("genai_user_data");

    if (storedToken) {
      setToken(storedToken);
      
      // If we have a token but no user data, fetch the user profile
      if (!storedUserData) {
        fetchUserProfile(storedToken)
          .then(() => {
            setIsAuthenticated(true);
            setIsLoading(false);
          })
          .catch((err) => {
            console.error("Error fetching user profile on init:", err);
            setIsAuthenticated(false);
            setIsLoading(false);
            // Clear invalid token
            Cookies.remove("genai_user_token");
          });
      } else {
        // If we have both token and user data, set them
        try {
          const userData = JSON.parse(storedUserData);
          setUser(userData);
          setIsAuthenticated(true);
        } catch (e) {
          console.error("Error parsing stored user data:", e);
          // If user data is corrupted, fetch it again
          fetchUserProfile(storedToken).catch(() => {
            Cookies.remove("genai_user_token");
            Cookies.remove("genai_user_data");
          });
        } finally {
          setIsLoading(false);
        }
      }
    } else {
      // No token found
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }, []);

  // Fetch user profile with token
  const fetchUserProfile = async (authToken: string) => {
    try {
      const response = await fetch(`${apiUrl}/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        credentials: "include",
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData.user);

        // Save to cookies with longer expiration
        Cookies.set("genai_user_data", JSON.stringify(userData.user), {
          expires: 1, // 1 day
          sameSite: "Strict",
        });
        
        setIsAuthenticated(true);
        return userData;
      } else {
        // If token is invalid, clear it
        Cookies.remove("genai_user_token");
        Cookies.remove("genai_user_data");
        setToken(null);
        setUser(null);
        setError("Session expired. Please login again.");
        setIsAuthenticated(false);
        throw new Error("Failed to fetch user profile");
      }
    } catch (err) {
      setError(
        `Failed to fetch user profile: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch the current user data
  const refreshUserData = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        // Instead of throwing an error immediately, check if it's a 401 (unauthorized)
        if (response.status === 401) {
          // User is not authenticated, clear user data
          setUser(null);
          return;
        }

        // For other errors, log them but don't throw
        console.error(
          `Error fetching user data: ${response.status} ${response.statusText}`
        );
        return;
      }

      const userData = await response.json();
      setUser(userData.user);

      // Save to cookies if needed
      if (userData) {
        saveUserDataToCookies(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error refreshing user data:", error);
      // Don't throw here, just log the error
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Cookies.set("genai_user_token", data.token);
        setToken(data.token);
        setUser(data.user);
        setIsAuthenticated(true);
        router.push("/dashboard");
      } else {
        setError(
          data.message || "Login failed. Please check your credentials."
        );
        setIsAuthenticated(false);
      }
    } catch (err) {
      setError(
        `Login failed: ${err instanceof Error ? err.message : String(err)}`
      );
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Cookies.set("genai_user_token", data.token);
        setToken(data.token);
        setUser(data.user);
        router.push("/dashboard");
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError(
        `Registration failed: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Save user data to Cookies on successful login
  const saveUserDataToCookies = async (userData: LoginProps) => {
    setIsLoading(true);
    Cookies.set("genai_user_token", JSON.stringify(userData?.token), {
      expires: 1 / 48, // 30 minutes (0.0208 days)
      sameSite: "Strict",
    });
    Cookies.set("genai_user_data", JSON.stringify(userData.user), {
      expires: 1 / 48, // 30 minutes (0.0208 days)
      sameSite: "Strict",
    });
    setIsLoading(false);
  };

  // Logout function
  const logout = () => {
    Cookies.remove("genai_user_token");
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    router.push("/login");
  };

  // Clear error state
  const clearError = () => setError(null);

  // Context value memoized to prevent unnecessary re-renders
  const value = React.useMemo(
    () => ({
      user,
      token,
      isAuthenticated,
      setIsAuthenticated,
      isLoading,
      error,
      login,
      register,
      logout,
      clearError,
      fetchUserProfile,
      refreshUserData,
      saveUserDataToCookies,
    }),
    [
      user,
      token,
      isAuthenticated,
      isLoading,
      error,
      fetchUserProfile,
      saveUserDataToCookies,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
