"use client";

import React, { useEffect, useState } from "react";
import DashboardContent from "@/components/dashboard/Content";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { SparklesCore } from "@/components/ui/aceternity/sparkles";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AlertTriangle } from "lucide-react";

const DashboardPage = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [showAccessDenied, setShowAccessDenied] = useState(false);

  useEffect(() => {
    // If authentication check is complete and user is not authenticated
    if (!isLoading && !isAuthenticated) {
      // Show access denied message for a moment before redirecting
      setShowAccessDenied(true);
      
      // Redirect to login after a short delay
      const timer = setTimeout(() => {
        router.push("/login");
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, isAuthenticated, router]);

  // Show loading state while checking authentication
  if (isLoading) {
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
            particleDensity={30}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>
        
        <div className="flex-grow flex items-center justify-center relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4 mx-auto"></div>
            <p className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              Loading dashboard...
            </p>
          </motion.div>
        </div>
        
        <Footer />
      </div>
    );
  }

  // Show access denied message
  if (showAccessDenied) {
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
            particleDensity={30}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>
        
        <div className="flex-grow flex items-center justify-center p-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="bg-gray-900/70 backdrop-blur-sm border border-red-500/30 rounded-lg p-8 max-w-md">
              <div className="flex justify-center mb-6">
                <AlertTriangle className="h-16 w-16 text-red-500" />
              </div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-600 mb-4">
                Access Denied
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                You must be logged in to access the dashboard.
              </p>
              <p className="text-gray-400 mb-6">
                Redirecting to login page.
              </p>
              <Button 
                onClick={() => router.push("/login")}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-2 px-6"
              >
                Go to Login
              </Button>
            </div>
          </motion.div>
        </div>
        
        <Footer />
      </div>
    );
  }

  // If authenticated, show dashboard content
  return <DashboardContent />;
};

export default DashboardPage;
