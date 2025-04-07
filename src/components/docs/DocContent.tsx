"use client";

import React from "react";
import { motion } from "framer-motion";
import { DocSection } from "@/types/types";

interface DocContentProps {
  activeSection: string;
  docSections: Record<string, DocSection>;
}

export const DocContent = ({ activeSection, docSections }: DocContentProps) => {
  const section = docSections[activeSection as keyof typeof docSections];
  
  if (!section) {
    return (
      <div className="flex-grow">
        <div className="bg-[#0d1117] p-6 rounded-lg border border-gray-800 shadow-lg">
          <h1 className="text-2xl font-bold text-white mb-6">Documentation</h1>
          <p className="text-gray-300">Please select a topic from the sidebar to view documentation.</p>
        </div>
      </div>
    );
  }
  
  return (
    <motion.div
      key={activeSection}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-grow"
    >
      <div className="bg-[#0d1117] p-6 rounded-lg border border-gray-800 shadow-lg">
        <h1 className="text-2xl font-bold text-purple-400 mb-4 pb-2 border-b border-gray-800">
          {section.title}
        </h1>
        <div className="prose prose-invert max-w-none">
          {section.content}
        </div>
      </div>
    </motion.div>
  );
};
