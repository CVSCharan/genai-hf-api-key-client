import { BackgroundGradient } from "@/components/ui/aceternity/background-gradient";
import { StepItem } from "@/types/types";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

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
      className="h-full"
    >
      {children}
    </motion.div>
  );
};

export function HowItWorksSection() {
  const steps: StepItem[] = [
    {
      number: "1",
      title: "Enter Your API Key",
      description:
        "Securely provide your Hugging Face API key to connect to powerful models",
    },
    {
      number: "2",
      title: "Choose Your Model",
      description:
        "Select from a variety of specialized AI models for your specific needs",
    },
    {
      number: "3",
      title: "Create & Analyze",
      description:
        "Start generating content, analyzing sentiment, or building conversations",
    },
  ];

  return (
    <section className="py-20 bg-gray-800 overflow-hidden">
      <div className="container mx-auto px-6">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr">
          {steps.map((step, index) => (
            <AnimateOnScroll key={index} delay={index * 0.2}>
              <BackgroundGradient className="rounded-xl p-[1px] h-full flex overflow-hidden">
                <motion.div
                  className="bg-gray-900 p-8 rounded-[10px] w-full flex flex-col"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  style={{ height: '100%' }}
                >
                  <motion.div
                    initial={{ scale: 1 }}
                    whileInView={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, delay: index * 0.3 + 0.5 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-2">
                      <span className="text-purple-400">{step.number}.</span>{" "}
                      {step.title}
                    </h3>
                  </motion.div>
                  <p className="text-gray-400 flex-grow">{step.description}</p>
                </motion.div>
              </BackgroundGradient>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
