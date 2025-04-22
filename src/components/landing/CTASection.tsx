"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BackgroundGradient } from "@/components/ui/aceternity/background-gradient";
import { Sparkles } from "lucide-react";
import { ApiKeyDialog } from "../shared/ApiKeyDialog";
import { useApiKeyModal } from "@/contexts/ApiKeyModalContext";
import { useRef } from "react";

export function CTASection() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const { 
    isModalOpen, 
    openModal, 
    closeModal, 
    apiKey, 
    setApiKey, 
    handleSubmit,
    setSourceSection 
  } = useApiKeyModal();

  // When the Get Started Now button is clicked
  const handleOpenModal = () => {
    setSourceSection("cta");
    openModal();
  };

  return (
    <section 
      ref={ctaRef}
      className="py-20 px-6 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 text-center">
        <BackgroundGradient className="p-[1px] rounded-xl max-w-4xl mx-auto">
          <div className="bg-gray-900 p-12 rounded-xl">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Harness the Power of AI?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Start creating, analyzing, and conversing with cutting-edge AI
              models today.
            </p>
            <div className="mt-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex justify-center mt-10"
              >
                <ApiKeyDialog
                  isOpen={isModalOpen}
                  onOpenChange={(open) => (open ? handleOpenModal() : closeModal())}
                  apiKey={apiKey}
                  setApiKey={setApiKey}
                  handleSubmit={handleSubmit}
                  triggerButton={
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 text-lg cursor-pointer">
                      <Sparkles className="h-5 w-5 mr-2" />
                      Get Started Now
                    </Button>
                  }
                />
              </motion.div>
            </div>
          </div>
        </BackgroundGradient>
      </div>
    </section>
  );
}
