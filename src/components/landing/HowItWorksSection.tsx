import { BackgroundGradient } from "@/components/ui/aceternity/background-gradient";

interface StepItem {
  number: string;
  title: string;
  description: string;
}

export function HowItWorksSection() {
  const steps: StepItem[] = [
    {
      number: "1",
      title: "Enter Your API Key",
      description: "Securely provide your Hugging Face API key to connect to powerful models"
    },
    {
      number: "2",
      title: "Choose Your Model",
      description: "Select from a variety of specialized AI models for your specific needs"
    },
    {
      number: "3",
      title: "Create & Analyze",
      description: "Start generating content, analyzing sentiment, or building conversations"
    }
  ];

  return (
    <section className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get started in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <BackgroundGradient key={index} className="rounded-xl p-[1px]">
              <div className="bg-gray-900 p-8 rounded-[10px] h-full flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2">{step.number}. {step.title}</h3>
                <p className="text-gray-400 flex-grow">
                  {step.description}
                </p>
              </div>
            </BackgroundGradient>
          ))}
        </div>
      </div>
    </section>
  );
}