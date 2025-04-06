"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { SparklesCore } from "@/components/ui/aceternity/sparkles";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const AuthErrorPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [countdown, setCountdown] = useState(5);
  const [errorMessage, setErrorMessage] = useState<string>(
    "There was a problem authenticating your account."
  );
  const [redirectPath, setRedirectPath] = useState("/login");
  const [buttonText, setButtonText] = useState("Return to Login");
  const [redirectText, setRedirectText] = useState("login");

  // First effect: process the error message and set up derived state
  useEffect(() => {
    // Get error message from URL if it exists
    const error = searchParams.get("message") || searchParams.get("error");
    if (error) {
      const decodedError = decodeURIComponent(error);
      setErrorMessage(decodedError);
      
      // Update redirect path and button text based on error message
      const isNoAccountError = decodedError.includes("No account found");
      setRedirectPath(isNoAccountError ? "/register" : "/login");
      setButtonText(isNoAccountError ? "Register Now" : "Return to Login");
      setRedirectText(isNoAccountError ? "registration" : "login");
    }
  }, [searchParams]);

  // Second effect: handle the countdown and redirect
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (timer) clearInterval(timer);
          // Use setTimeout to avoid state updates during render
          setTimeout(() => {
            router.push(redirectPath);
          }, 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [router, redirectPath]);

  // Handle button click
  const handleButtonClick = () => {
    // Use setTimeout to avoid state updates during render
    setTimeout(() => {
      router.push(redirectPath);
    }, 0);
  };

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
            <XCircle className="h-24 w-24 text-red-500" />
          </div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-orange-500 to-red-500 mb-4">
            Authentication Failed
          </h1>
          <p className="text-xl text-gray-300 mb-6">{errorMessage}</p>
          <div className="space-y-4">
            <Button
              onClick={handleButtonClick}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6"
            >
              {buttonText}
            </Button>
            <p className="text-gray-400 mt-4">
              Redirecting to {redirectText} in {countdown} seconds...
            </p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default AuthErrorPage;
