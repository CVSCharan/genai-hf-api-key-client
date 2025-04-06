import { BackgroundGradient } from "@/components/ui/aceternity/background-gradient";
import { Database, Server, Code, Globe } from "lucide-react";

interface TechItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

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
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Built with MERN Stack
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Leveraging modern web technologies for a powerful, scalable application
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {techStack.map((tech, index) => (
            <BackgroundGradient key={index} className="rounded-xl p-[1px]">
              <div className="bg-gray-900 p-8 rounded-[10px] h-full flex flex-col">
                <div className="mb-4">{tech.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {tech.title}
                </h3>
                <p className="text-gray-400 flex-grow">
                  {tech.description}
                </p>
              </div>
            </BackgroundGradient>
          ))}
        </div>
      </div>
    </section>
  );
}