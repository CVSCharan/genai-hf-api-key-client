import { BackgroundGradient } from "@/components/ui/aceternity/background-gradient";
import { Database, Server, Code, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { TechItem } from "@/types/types";

// Animation component that triggers when scrolled into view
const AnimateOnScroll = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

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

export function TechStackSection() {
  const techStack: TechItem[] = [
    {
      title: "MongoDB",
      description: "NoSQL database for flexible, scalable data storage",
      icon: <Database className="h-10 w-10 text-green-500" />,
    },
    {
      title: "Express.js",
      description: "Fast, unopinionated web framework for Node.js",
      icon: <Server className="h-10 w-10 text-gray-400" />,
    },
    {
      title: "React",
      description: "JavaScript library for building user interfaces",
      icon: <Code className="h-10 w-10 text-blue-500" />,
    },
    {
      title: "Node.js",
      description: "JavaScript runtime for server-side applications",
      icon: <Globe className="h-10 w-10 text-green-600" />,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
      <div className="container mx-auto px-6">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Built with MERN Stack
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Leveraging modern web technologies for a powerful, scalable
              application
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {techStack.map((tech, index) => (
            <AnimateOnScroll key={index} delay={index * 0.15}>
              <BackgroundGradient className="rounded-xl p-[1px]">
                <div className="bg-gray-900 p-8 rounded-[10px] h-full flex flex-col">
                  <motion.div
                    className="mb-4"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {tech.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {tech.title}
                  </h3>
                  <p className="text-gray-400 flex-grow">{tech.description}</p>
                </div>
              </BackgroundGradient>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
