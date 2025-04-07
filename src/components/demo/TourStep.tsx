import React from "react";
import { X } from "lucide-react";
import { TourStepProps } from "@/types/types";

export const TourStep = ({
  step,
  title,
  position = "bottom", // Default to bottom if not specified
  description,
  onClose,
}: TourStepProps) => {
  // Define positioning styles based on the position prop
  let positionStyles = {};
  
  switch (position) {
    case "top":
      positionStyles = { bottom: "60%" };
      break;
    case "bottom":
      positionStyles = { top: "40%" };
      break;
    case "left":
      positionStyles = { right: "60%" };
      break;
    case "right":
      positionStyles = { left: "60%" };
      break;
    default:
      positionStyles = { top: "40%" };
  }

  return (
    <div 
      className="fixed z-[9999] pointer-events-none flex items-center justify-center"
      style={{ ...positionStyles, inset: 0 }}
    >
      <div className="pointer-events-auto bg-gradient-to-r from-purple-600 to-pink-600 p-0.5 rounded-lg shadow-xl max-w-[400px]">
        <div className="bg-gray-900 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <span className="bg-purple-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center mr-2">
                {step}
              </span>
              <h3 className="font-medium text-white">{title}</h3>
            </div>
            <button
              onClick={() => onClose(true)}
              className="text-gray-400 hover:text-white cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
          <p className="text-sm text-gray-300">{description}</p>
          <div className="mt-3 flex justify-between">
            <button
              onClick={() => onClose(true)}
              className="text-xs text-gray-400 hover:text-white"
            >
              Skip
            </button>
            <button
              onClick={() => onClose(false)}
              className="cursor-pointer text-xs bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded-md text-white hover:from-purple-600 hover:to-pink-600"
            >
              {step < 3 ? "Next" : "Got it"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
