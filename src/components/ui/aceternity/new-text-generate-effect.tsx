"use client";
import { useEffect, useState, useRef } from "react";
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
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset state when words change
    setRenderedText("");
    setIsComplete(false);
    setIsPaused(false);

    // Handle empty or undefined input
    if (!words) {
      setRenderedText("");
      setIsComplete(true);
      return;
    }

    // Split the input text into characters for more natural typing effect
    const characters = words.split("");
    let currentIndex = 0;
    let pauseCounter = 0;

    // Function to add the next character
    const addNextCharacter = () => {
      if (currentIndex >= characters.length) {
        setIsComplete(true);
        return;
      }

      // Occasionally pause to simulate thinking (more authentic)
      if (Math.random() < 0.03 && pauseCounter < 3) {
        setIsPaused(true);
        pauseCounter++;
        timeoutRef.current = setTimeout(() => {
          setIsPaused(false);
          timeoutRef.current = setTimeout(addNextCharacter, getTypingDelay());
        }, Math.random() * 500 + 200); // Pause for 200-700ms
        return;
      }

      // Add the next character
      setRenderedText((prev) => prev + characters[currentIndex]);
      currentIndex++;

      // Schedule the next character
      timeoutRef.current = setTimeout(addNextCharacter, getTypingDelay());
    };

    // Get a realistic typing delay
    const getTypingDelay = () => {
      // Faster for spaces and punctuation, slower for other characters
      const char = characters[currentIndex];
      if (char === " ") return Math.random() * 30 + 10; // 10-40ms for spaces
      if (".,:;!?".includes(char)) return Math.random() * 100 + 100; // 100-200ms for punctuation
      return Math.random() * 30 + 20; // 20-50ms for normal characters
    };

    // Start the generation process with a small initial delay
    timeoutRef.current = setTimeout(addNextCharacter, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [words]);

  return (
    <div className={cn("font-normal", className)}>
      <motion.div
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {renderedText}
        {!isComplete && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: isPaused ? 0.7 : 1 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="inline-block ml-1 w-1.5 h-4 bg-current align-text-bottom"
            style={{ marginBottom: "-1px" }}
          />
        )}
      </motion.div>
    </div>
  );
};
