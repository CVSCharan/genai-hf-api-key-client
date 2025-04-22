"use client";

import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { TechStackSection } from "@/components/landing/TechStackSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { TestimonialSection } from "@/components/landing/TestimonialSection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/layout/Footer";
import { ApiKeyModalProvider } from "@/contexts/ApiKeyModalContext";

export default function Home() {
  return (
    <ApiKeyModalProvider>
      <div className="flex flex-col min-h-screen bg-black">
        <Navbar />
        <HeroSection />
        <TechStackSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialSection />
        <CTASection />
        <Footer />
      </div>
    </ApiKeyModalProvider>
  );
}
