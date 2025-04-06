"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SparklesCore } from "@/components/ui/aceternity/sparkles";
import { TextGenerateEffect } from "@/components/ui/aceternity/text-generate-effect";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface HeroSectionProps {
  apiKey: string;
  setApiKey: (value: string) => void;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export function HeroSection({
  apiKey,
  setApiKey,
  isModalOpen,
  setIsModalOpen,
  handleSubmit,
}: HeroSectionProps) {
  return (
    <div className="relative h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      <div className="relative z-10 text-center px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-4">
            Unlock the Power of GenAI
          </h1>
          <TextGenerateEffect
            words="Transforming an Idea into reality with cutting-edge AI models at fingertips."
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
          />
          <p className="text-gray-400 mt-4">
            A project by{" "}
            <span className="text-purple-400 font-semibold">CVS Charan</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-md mx-auto"
        >
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 text-lg cursor-pointer">
                Try Now
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-800">
              <DialogHeader>
                <DialogTitle className="text-white text-xl">
                  Enter Your API Key
                </DialogTitle>
                <DialogDescription className="text-gray-400">
                  Provide your Hugging Face API key to start using GenAI
                  capabilities.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <Input
                  type="password"
                  placeholder="Enter your Hugging Face API Key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3"
                >
                  Start Creating with AI
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </div>
  );
}
