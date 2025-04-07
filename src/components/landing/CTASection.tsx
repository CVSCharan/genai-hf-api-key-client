import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BackgroundGradient } from "@/components/ui/aceternity/background-gradient";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CTASectionProps } from "@/types/types";

export function CTASection({
  apiKey,
  setApiKey,
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
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 text-lg cursor-pointer">
                  Get Started Now
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-gray-800">
                <DialogHeader>
                  <DialogTitle className="text-white text-xl">
                    Enter Your API Key
                  </DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Provide your Hugging Face API key to start using GenAI
                    capabilities.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <Input
                    type="password"
                    placeholder="Enter your Hugging Face API Key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3"
                  >
                    Start Creating with AI
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </BackgroundGradient>
      </div>
    </section>
  );
}
