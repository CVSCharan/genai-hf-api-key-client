import { Button } from "@/components/ui/button";
import { BackgroundGradient } from "@/components/ui/aceternity/background-gradient";
import { CTASectionProps } from "@/types/types";
import { ApiKeyDialog } from "@/components/shared/ApiKeyDialog";

export function CTASection({
  apiKey,
  setApiKey,
  isModalOpen,
  setIsModalOpen,
  handleSubmit,
}: CTASectionProps) {
  return (
    <section className="py-20 bg-black">
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
              <ApiKeyDialog
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
                apiKey={apiKey}
                setApiKey={setApiKey}
                handleSubmit={handleSubmit}
                triggerButton={
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 text-lg">
                    Get Started Now
                  </Button>
                }
              />
            </div>
          </div>
        </BackgroundGradient>
      </div>
    </section>
  );
}
