"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SparklesCore } from "@/components/ui/aceternity/sparkles";
import { TextGenerateEffect } from "@/components/ui/aceternity/text-generate-effect";
import { Code } from "lucide-react";
import { HeroSectionProps } from "@/types/types";
import { useRef } from "react";
import Link from "next/link";
import { ApiKeyDialog } from "../shared/ApiKeyDialog";

export function HeroSection({
  apiKey,
  setApiKey,
  isModalOpen,
  setIsModalOpen,
  handleSubmit,
}: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  // Get scroll progress for this section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Transform scroll progress into different animation values for parallax effect
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const buttonsY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.7]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentRotate = useTransform(scrollYProgress, [0, 0.5], [0, -3]);

  return (
    <div
      ref={heroRef}
      className="relative h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      <motion.div
        className="w-full absolute inset-0 h-screen"
        style={{ scale: backgroundScale, opacity: backgroundOpacity }}
      >
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </motion.div>

      <div className="relative z-10 text-center px-6 md:px-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 relative backdrop-blur-sm bg-black/30 p-6 sm:p-8 rounded-2xl border border-gray-800/50 shadow-xl max-w-4xl mx-auto w-full"
          style={{
            opacity: contentOpacity,
            rotate: contentRotate,
            transformOrigin: "center center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl"></div>
          <div className="relative z-10">
            <motion.div style={{ y: titleY }}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-3 md:mb-4">
                Unlock the Power of GenAI
              </h1>
            </motion.div>

            <motion.div style={{ y: subtitleY }}>
              <TextGenerateEffect
                words="Imagination to Innovation"
                className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
              />
              <p className="text-gray-400 mt-3 md:mt-4 text-sm sm:text-base">
                Engineered by{" "}
                <span className="text-purple-400 font-semibold">
                  CVS Charan
                </span>
              </p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-md mx-auto"
          style={{ y: buttonsY, opacity: contentOpacity }}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ApiKeyDialog
              isOpen={isModalOpen}
              onOpenChange={setIsModalOpen}
              apiKey={apiKey}
              setApiKey={setApiKey}
              handleSubmit={handleSubmit}
            />
            <Link href="/docs?section=source-code">
              <Button
                variant="outline"
                className="border-purple-500 text-purple-500 hover:bg-purple-500/10 font-bold py-3 px-8 text-lg cursor-pointer"
              >
                <Code className="h-5 w-5 mr-2" />
                Source Code
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
