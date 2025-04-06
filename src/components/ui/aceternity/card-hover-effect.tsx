"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardHoverEffectProps {
  items: {
    title: string;
    description: string;
    link?: string;
  }[];
  className?: string;
}

export const CardHoverEffect = ({
  items,
  className,
}: CardHoverEffectProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-4 py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"
            animate={{
              opacity: hoveredIndex === idx ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute inset-0.5 bg-gray-900 rounded-lg"
            animate={{
              opacity: hoveredIndex === idx ? 1 : 0.8,
            }}
            transition={{ duration: 0.3 }}
          />
          <div className="relative h-full w-full p-6 flex flex-col">
            <div className="text-2xl font-bold text-white mb-2">{item.title}</div>
            <p className="text-gray-400 mb-4">{item.description}</p>
            {item.link && (
              <div className="mt-auto">
                <a
                  href={item.link}
                  className="text-purple-400 hover:text-purple-300 font-medium"
                >
                  Learn more →
                </a>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};