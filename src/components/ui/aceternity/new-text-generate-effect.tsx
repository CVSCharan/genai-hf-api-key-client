"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const NewTextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const [renderedText, setRenderedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Reset state when words change
    setRenderedText("");
    setIsComplete(false);

    // Split the input text into words
    const wordArray = words.split(" ");
    let currentIndex = 0;

    // Function to add the next chunk of words
    const addNextChunk = () => {
      if (currentIndex >= wordArray.length) {
        setIsComplete(true);
        return;
      }

      // Determine chunk size (1-3 words randomly)
      const chunkSize = Math.floor(Math.random() * 3) + 1;
      const chunk = wordArray
        .slice(currentIndex, currentIndex + chunkSize)
        .join(" ");

      // Add a space if not the first chunk
      const space = currentIndex > 0 ? " " : "";

      setRenderedText((prev) => prev + space + chunk);
      currentIndex += chunkSize;

      // Random delay between chunks (50-150ms)
      const delay = Math.floor(Math.random() * 100) + 50;
      setTimeout(addNextChunk, delay);
    };

    // Start the generation process
    const timeout = setTimeout(addNextChunk, 300);

    return () => clearTimeout(timeout);
  }, [words]);

  return (
    <div className={cn("font-bold", className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {renderedText}
        {!isComplete && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="inline-block ml-1 bg-gradient-to-r from-purple-400 to-pink-500 h-4 w-1"
          />
        )}
      </motion.div>
    </div>
  );
};
