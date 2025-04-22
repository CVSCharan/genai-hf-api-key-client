import React from "react";
import { TourStep } from "@/components/demo/TourStep";
import { TourGuideProps } from "@/types/types";

export const TourGuide: React.FC<TourGuideProps> = ({ 
  tourStep, 
  closeTour, 
  nextTourStep 
}) => {
  return (
    <>
      {tourStep === 1 && (
        <TourStep
          step={1}
          title="Enter API Key"
          description="Start by entering your Hugging Face API key and click the key button to validate it."
          position="bottom"
          onClose={(skipAll) => (skipAll ? closeTour() : nextTourStep())}
        />
      )}
      {tourStep === 2 && (
        <TourStep
          step={2}
          title="Choose Category"
          description="Select a model category based on what you want to do: have a conversation, generate creative content, or analyze sentiment."
          position="bottom"
          onClose={(skipAll) => (skipAll ? closeTour() : nextTourStep())}
        />
      )}
      {tourStep === 3 && (
        <TourStep
          step={3}
          title="Select Model"
          description="Finally, choose a specific model to start your conversation. Different models have different capabilities."
          position="bottom"
          onClose={(skipAll) => (skipAll ? closeTour() : closeTour())}
        />
      )}
    </>
  );
};