"use client";

import React, { useState } from "react";
import { DocNavigation } from "@/components/docs/DocNavigation";
import { DocContent } from "@/components/docs/DocContent";
import { navItems, docSections } from "@/data/docsData";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const DocumentationPage = () => {
  const [activeSection, setActiveSection] = useState("how-it-works");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <main className="flex-grow bg-black px-4 sm:px-6 lg:px-8 pt-16">
        <div className="max-w-7xl mx-auto py-8 lg:py-12">
          {/* Mobile Navigation Toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="flex items-center space-x-2 px-4 py-2 rounded-md bg-gray-800 text-white"
            >
              <span>{mobileNavOpen ? "Hide" : "Show"} Docs Nav</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transition-transform ${
                  mobileNavOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-col lg:flex-row lg:gap-8">
            {/* Navigation - conditionally shown on mobile */}
            <div
              className={`${
                mobileNavOpen ? "block" : "hidden"
              } lg:block lg:sticky lg:top-20 lg:self-start`}
            >
              <DocNavigation
                navItems={navItems}
                activeSection={activeSection}
                setActiveSection={(section) => {
                  setActiveSection(section);
                  // Close mobile nav when a section is selected on small screens
                  if (window.innerWidth < 1024) {
                    setMobileNavOpen(false);
                  }
                }}
              />
            </div>

            {/* Content - always shown */}
            <div className="w-full mt-4 lg:mt-0">
              <DocContent
                activeSection={activeSection}
                docSections={docSections}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DocumentationPage;
