import { BrainCircuit, MessageSquare, LineChart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FeatureItem } from "@/types/types";

// Animation component that triggers when scrolled into view
const AnimateOnScroll = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay: delay }}
    >
      {children}
    </motion.div>
  );
};

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
    <section className="py-20 bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-6">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Powerful AI Capabilities
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Leverage state-of-the-art models for creative writing, sentiment
              analysis, and more.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <AnimateOnScroll key={index} delay={index * 0.15}>
              <div className="relative group h-full">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-75 group-hover:opacity-100 transition duration-200"></div>
                <div className="relative bg-gray-900 p-8 rounded-lg h-full flex flex-col">
                  <motion.div
                    className="mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 flex-grow">
                    {feature.description}
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
