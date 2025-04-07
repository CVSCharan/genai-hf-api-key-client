"use client";

import React from "react";
import { motion } from "framer-motion";
import { SparklesCore } from "@/components/ui/aceternity/sparkles";
import { BackgroundGradient } from "@/components/ui/aceternity/background-gradient";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md text-center"
        >
          <h1 className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            404
          </h1>

          <div className="mt-6 mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Page Not Found
            </h2>
            <p className="text-gray-400 text-lg">
              {`The page you're looking for doesn't exist or has been moved.`}
            </p>
          </div>

          <BackgroundGradient className="rounded-xl p-[1px] inline-block">
            <Link href="/">
              <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-6 rounded-[10px] font-medium cursor-pointer">
                Return to Home
              </Button>
            </Link>
          </BackgroundGradient>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
