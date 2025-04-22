import React from "react";
import { useDemoContext } from "@/contexts/DemoContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Layers, Cpu } from "lucide-react";
import { ModelSelectorProps } from "@/types/types";

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  categoryRef,
  modelRef,
  tourStep,
  nextTourStep,
  isDisabled = false,
}) => {
  const {
    isKeyValid,
    selectedModel,
    setSelectedModel,
    modelCategory,
    setModelCategory,
    filteredModels,
  } = useDemoContext();

  return (
    <>
      <div ref={categoryRef} className="relative">
        <label className="text-sm text-gray-300 mb-2 flex items-center">
          <Layers size={14} className="mr-1" />
          Model Category
        </label>
        <Select
          value={modelCategory}
          onValueChange={(value: "creative" | "sentiment" | "conversation") => {
            setModelCategory(value);
            if (tourStep === 2) {
              nextTourStep();
            }
          }}
          disabled={!isKeyValid || isDisabled}
        >
          <SelectTrigger
            className={`w-full bg-gray-800 border-gray-700 ${
              !isKeyValid || isDisabled ? "opacity-50 cursor-not-allowed" : ""
            } ${
              tourStep === 2
                ? "outline outline-2 outline-white outline-offset-2 animate-pulse"
                : ""
            }`}
          >
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="conversation">Conversation</SelectItem>
            <SelectItem value="creative">Creative Writing</SelectItem>
            <SelectItem value="sentiment">Sentiment Analysis</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div ref={modelRef} className="relative">
        <label className="text-sm text-gray-300 mb-2 flex items-center">
          <Cpu size={14} className="mr-1" />
          Model
        </label>
        <Select
          value={selectedModel}
          onValueChange={(value) => {
            setSelectedModel(value);
            if (tourStep === 3) {
              nextTourStep();
            }
          }}
          disabled={!isKeyValid || filteredModels.length === 0 || isDisabled}
        >
          <SelectTrigger
            className={`w-full bg-gray-800 border-gray-700 ${
              !isKeyValid || filteredModels.length === 0 || isDisabled
                ? "opacity-50 cursor-not-allowed"
                : ""
            } ${
              tourStep === 3
                ? "outline outline-2 outline-white outline-offset-2 animate-pulse"
                : ""
            }`}
          >
            <SelectValue
              placeholder={
                filteredModels.length > 0
                  ? "Select a model"
                  : "No models available"
              }
            />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 max-h-[200px]">
            {filteredModels.map((model) => (
              <SelectItem key={model.id} value={model.id}>
                {model.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
