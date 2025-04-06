"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { TechStackSection } from "@/components/landing/TechStackSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { TestimonialSection } from "@/components/landing/TestimonialSection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  const [apiKey, setApiKey] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle API key submission
    console.log("API Key submitted:", apiKey);
    // Add your API key validation and storage logic here
    setIsModalOpen(false); // Close modal after submission
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      <HeroSection 
        apiKey={apiKey}
        setApiKey={setApiKey}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleSubmit={handleSubmit}
      />
      <TechStackSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialSection />
      <CTASection 
        apiKey={apiKey}
        setApiKey={setApiKey}
        handleSubmit={handleSubmit}
      />
      <Footer />
    </div>
  );
}
