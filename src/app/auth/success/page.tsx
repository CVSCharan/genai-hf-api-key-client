"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { SparklesCore } from "@/components/ui/aceternity/sparkles";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// Client component that safely uses useSearchParams
const AuthSuccessContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [countdown, setCountdown] = useState(3);
  const { login } = useAuth();
  const [redirectInitiated, setRedirectInitiated] = useState(false);

  // Use useCallback to memoize the redirect function
  const handleRedirect = useCallback(() => {
    if (!redirectInitiated) {
      setRedirectInitiated(true);
      router.push("/dashboard");
    }
  }, [router, redirectInitiated]);

  useEffect(() => {
    // Only proceed if we haven't already initiated a redirect
    if (redirectInitiated) return;

    // Get token from URL
    const token = searchParams.get("token");
    console.log("Token from URL:", token);

    let timer: NodeJS.Timeout | null = null;

    // Check if we're in the browser and try to get from window.location if searchParams fails
    if (typeof window !== "undefined" && !token) {
      const urlParams = new URLSearchParams(window.location.search);
      const tokenFromUrl = urlParams.get("token");
      console.log("Token from window.location:", tokenFromUrl);

      if (tokenFromUrl) {
        // Try to decode the JWT to get user info
        try {
          const payload = JSON.parse(atob(tokenFromUrl.split(".")[1]));
          const user = {
            id: payload.id || payload.sub,
            email: payload.email,
            name: payload.name,
            picture: payload.picture,
          };

          // Save to auth context
          login(tokenFromUrl, user);

          // Start countdown to redirect
          timer = setInterval(() => {
            setCountdown((prev) => {
              if (prev <= 1) {
                if (timer) clearInterval(timer);
                handleRedirect();
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        } catch (error) {
          console.error("Error parsing token:", error);
          // Mock user for testing
          const mockUser = {
            id: "mock-id",
            email: "user@example.com",
            name: "Test User",
          };
          login(tokenFromUrl, mockUser);

          timer = setInterval(() => {
            setCountdown((prev) => {
              if (prev <= 1) {
                if (timer) clearInterval(timer);
                handleRedirect();
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        }
      } else {
        // For development/testing - create mock data
        console.log("No token found. Creating mock data for testing.");
        const mockToken = "mock_token_for_testing";
        const mockUser = {
          id: "mock-id",
          email: "user@example.com",
          name: "Test User",
        };
        login(mockToken, mockUser);

        timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              if (timer) clearInterval(timer);
              handleRedirect();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } else if (token) {
      // Try to decode the JWT to get user info
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const user = {
          id: payload.id || payload.sub,
          email: payload.email,
          name: payload.name,
          picture: payload.picture,
        };

        // Save to auth context
        login(token, user);

        // Start countdown to redirect
        timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              if (timer) clearInterval(timer);
              handleRedirect();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } catch (error) {
        console.error("Error parsing token:", error);
        // Mock user for testing
        const mockUser = {
          id: "mock-id",
          email: "user@example.com",
          name: "Test User",
        };
        login(token, mockUser);

        timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              if (timer) clearInterval(timer);
              handleRedirect();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } else {
      // No token found, redirect to login after a short delay
      console.error("No token found in URL");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }

    // Cleanup function
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [searchParams, login, handleRedirect, redirectInitiated]);

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

      <div className="container mx-auto px-6 py-24 relative z-10 flex-grow flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-24 w-24 text-green-500" />
          </div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-4">
            Authentication Successful!
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            You have been successfully authenticated.
          </p>
          <p className="text-gray-400">
            Redirecting to dashboard in {countdown} seconds...
          </p>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

// Main page component
const AuthSuccessPage = () => {
  return <AuthSuccessContent />;
};

export default AuthSuccessPage;
