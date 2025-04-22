"use client";

import React, { Suspense, useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { SparklesCore } from "@/components/ui/aceternity/sparkles";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Cookies from "js-cookie";

// Client component that safely uses useSearchParams
const AuthSuccessContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [countdown, setCountdown] = useState(3);
  const [redirectInitiated, setRedirectInitiated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { fetchUserProfile, setIsAuthenticated } = useAuth();

  // Use useCallback to memoize the redirect function
  const handleRedirect = useCallback(() => {
    if (!redirectInitiated) {
      setRedirectInitiated(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 0);
    }
  }, [router, redirectInitiated]);

  // Function to start countdown timer
  const startCountdown = useCallback(() => {
    // Set initial countdown value
    setCountdown(3);

    // Create timer that decrements every second
    const timer = setInterval(() => {
      setCountdown((prev) => {
        const newValue = prev - 1;
        if (newValue <= 0) {
          clearInterval(timer);
          handleRedirect();
          return 0;
        }
        return newValue;
      });
    }, 1000);

    // Return cleanup function
    return timer;
  }, [handleRedirect]);

  useEffect(() => {
    // Only proceed if we haven't already initiated a redirect
    if (redirectInitiated) return;

    // Get token from URL
    const token = searchParams.get("token");
    // console.log("Token from URL:", token);

    let timer: NodeJS.Timeout | null = null;

    // Process the token if it exists
    if (token) {
      try {
        // Store the token in cookies first to ensure it's available after refresh
        Cookies.set("genai_user_token", token, {
          expires: 1, // 1 day
          sameSite: "Strict",
        });

        // Use the fetchUserProfile function from AuthContext
        fetchUserProfile(token)
          .then(() => {
            // Set authenticated state
            setIsAuthenticated(true);
            // Start countdown after successful authentication
            timer = startCountdown();
          })
          .catch((err) => {
            console.error("Error fetching user profile:", err);
            setError("Failed to authenticate. Please try again.");
            // Redirect to login after a short delay
            setTimeout(() => {
              router.push("/login");
            }, 2000);
          });
      } catch (error) {
        console.error("Error processing token:", error);
        setError("Authentication failed. Please try again.");
        // Redirect to login after a short delay
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } else {
      // No token found, redirect to login
      console.warn("No token found, redirecting to login");
      router.push("/login");
    }

    // Cleanup function
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [searchParams, handleRedirect, redirectInitiated, router, startCountdown]);

  // Rest of the component remains the same
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
          {error ? (
            <>
              <div className="flex justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-24 w-24 text-red-500"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-red-500 mb-4">
                Authentication Failed
              </h1>
              <p className="text-xl text-gray-300 mb-2">{error}</p>
              <p className="text-gray-400">Redirecting to login page...</p>
            </>
          ) : (
            <>
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
            </>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

// Loading fallback component
const LoadingFallback = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-6 py-24 relative z-10 flex-grow flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-300">Loading...</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Main page component
const AuthSuccessPage = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AuthSuccessContent />
    </Suspense>
  );
};

export default AuthSuccessPage;
