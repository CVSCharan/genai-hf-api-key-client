import { BackgroundGradient } from "@/components/ui/aceternity/background-gradient";
import { BrainCircuit, MessageSquare, LineChart, Sparkles } from "lucide-react";

interface FeatureItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function FeaturesSection() {
  const features: FeatureItem[] = [
    {
      title: "Creative Writing AI",
      description:
        "Generate stories, poems, and creative content with advanced language models",
      icon: <BrainCircuit className="h-10 w-10 text-purple-400" />,
    },
    {
      title: "Sentiment Analysis",
      description:
        "Analyze text to determine emotional tone and sentiment with precision",
      icon: <LineChart className="h-10 w-10 text-purple-400" />,
    },
    {
      title: "Conversational AI",
      description:
        "Build dynamic conversations with state-of-the-art language models",
      icon: <MessageSquare className="h-10 w-10 text-purple-400" />,
    },
    {
      title: "Custom AI Solutions",
      description:
        "Tailor AI capabilities to your specific needs with flexible integration",
      icon: <Sparkles className="h-10 w-10 text-purple-400" />,
    },
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Powerful AI Capabilities
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Leverage state-of-the-art models for creative writing, sentiment
            analysis, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="relative group h-full">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-75 group-hover:opacity-100 transition duration-200"></div>
              <div className="relative bg-gray-900 p-8 rounded-lg h-full flex flex-col">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 flex-grow">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}