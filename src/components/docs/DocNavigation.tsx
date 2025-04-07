"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { NavItem } from "@/types/types";

interface DocNavigationProps {
  navItems: NavItem[];
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const DocNavigation = ({
  navItems,
  activeSection,
  setActiveSection,
}: DocNavigationProps) => {
  // State remains the same
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    "getting-started": true,
    development: true,
    resources: true,
  });

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <aside className="w-full lg:w-72 flex-shrink-0 sticky top-20 self-start">
      <div className="bg-[#0d1117] rounded-lg border border-gray-800 shadow-lg pt-3 pb-4">
        <div className="p-4">
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mb-4 pb-2 border-b border-gray-800">
            Documentation
          </h2>
          <nav className="space-y-1">
            {navItems.map((section) => (
              <div key={section.id} className="mb-2">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between px-3 py-2 text-left rounded-md hover:bg-gray-800 text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  <div className="flex items-center">
                    <span className="mr-2 text-purple-400">{section.icon}</span>
                    <span className="font-medium">{section.title}</span>
                  </div>
                  <ChevronRight
                    className={`h-4 w-4 transition-transform ${
                      expandedSections[section.id]
                        ? "rotate-90 text-purple-400"
                        : "text-gray-500"
                    }`}
                  />
                </button>

                {expandedSections[section.id] && section.children && (
                  <div className="ml-6 mt-1 space-y-1 border-l border-gray-800 pl-3">
                    {section.children.map((child) => (
                      <button
                        key={child.id}
                        onClick={() => setActiveSection(child.id)}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-md text-sm transition-colors cursor-pointer",
                          activeSection === child.id
                            ? "bg-purple-900/30 text-purple-300 font-medium"
                            : "text-gray-400 hover:text-white hover:bg-gray-800"
                        )}
                      >
                        {child.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};
