import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SparklesCore } from "@/components/ui/aceternity/sparkles";
import { useDemoContext } from "@/contexts/DemoContext";
import { TourGuide } from "./TourGuide";
import { ApiKeyInput } from "./ApiKeyInput";
import { ModelSelector } from "./ModelSelector";
import { ChatInterface } from "./ChatInterface";
import Link from "next/link";

const DemoContent: React.FC = () => {
  const {
    apiKey,
    selectedModel,
    isLoading,
    modelCategory,
    handleClearChat,
    showLoginModal,
    messageCount,
  } = useDemoContext();

  // Tour state
  const [tourStep, setTourStep] = useState<number | null>(null);
  const [hasSeenTour, setHasSeenTour] = useState(false);

  // Initialize tour on first render
  useEffect(() => {
    const tourSeen = localStorage.getItem("cvs-genai-demo-tour-seen");
    if (!tourSeen) {
      setTourStep(1);
      setHasSeenTour(false);
    } else {
      setHasSeenTour(true);
    }
  }, []);

  // Close tour
  const closeTour = () => {
    setTourStep(null);
    localStorage.setItem("cvs-genai-demo-tour-seen", "true");
    setHasSeenTour(true);
  };

  // Next tour step
  const nextTourStep = () => {
    if (tourStep && tourStep < 3) {
      setTourStep(tourStep + 1);
    } else {
      closeTour();
    }
  };

  // Reset conversation when model category, model, or API key changes
  useEffect(() => {
    handleClearChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelCategory, selectedModel, apiKey]);

  // References for tour elements
  const apiKeyRef = React.useRef<HTMLDivElement>(null);
  const categoryRef = React.useRef<HTMLDivElement>(null);
  const modelRef = React.useRef<HTMLDivElement>(null);

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

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 p-6 rounded-xl border border-purple-500/30 max-w-md w-full"
          >
            <h2 className="text-2xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Demo Limit Reached
            </h2>
            <p className="text-gray-300 mb-6 text-center">
              You've used {messageCount} out of 3 free demo messages. To
              continue using the GenAI platform, please log in with your account
              or create a new one.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-md text-center font-medium hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="bg-gray-800 text-white py-2 px-4 rounded-md text-center font-medium hover:bg-gray-700 transition-all"
              >
                Create Account
              </Link>
            </div>
          </motion.div>
        </div>
      )}

      {/* Tour Guide Component */}
      <TourGuide
        tourStep={tourStep}
        closeTour={closeTour}
        nextTourStep={nextTourStep}
      />

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10 flex-grow flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto w-full flex-grow flex flex-col"
        >
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-2">
              GenAI Demo Playground
            </h1>
            <p className="text-gray-400 text-base max-w-2xl mx-auto">
              Test different Hugging Face models with your API key
            </p>
            {hasSeenTour && (
              <button
                onClick={() => setTourStep(1)}
                className="text-underline cursor-pointer mt-2 text-sm text-purple-400 hover:text-purple-300"
              >
                How it works?
              </button>
            )}
          </div>

          {/* API Key and Model Selection */}
          <div className="bg-gray-900/70 rounded-xl p-4 mb-4 backdrop-blur-sm border border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ApiKeyInput
                apiKeyRef={apiKeyRef}
                tourStep={tourStep}
                nextTourStep={nextTourStep}
              />

              <ModelSelector
                categoryRef={categoryRef as React.RefObject<HTMLDivElement>}
                modelRef={modelRef as React.RefObject<HTMLDivElement>}
                tourStep={tourStep}
                nextTourStep={nextTourStep}
                closeTour={closeTour}
                isDisabled={isLoading} // Pass isLoading as isDisabled prop
              />
            </div>
          </div>

          {/* Chat Interface */}
          <ChatInterface />
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default DemoContent;
