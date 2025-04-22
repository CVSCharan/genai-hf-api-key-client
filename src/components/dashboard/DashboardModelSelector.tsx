import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Layers, Cpu } from "lucide-react";
import { DashboardModelSelectorProps } from "@/types/types";
import { useDashboard } from "@/contexts/DashboardContext";

export const DashboardModelSelector: React.FC<DashboardModelSelectorProps> = ({
  isDisabled,
  selectedCategory,
  selectedModel,
  onCategoryChange,
  onModelChange,
}) => {
  const { availableModels } = useDashboard();

  return (
    <>
      <div className="flex flex-col">
        <label className="text-sm text-gray-300 mb-2 flex items-center">
          <Layers size={14} className="mr-1" />
          Model Category
        </label>
        <Select
          value={selectedCategory}
          onValueChange={(value: "creative" | "sentiment" | "conversation") => {
            onCategoryChange(value);
          }}
          disabled={isDisabled}
        >
          <SelectTrigger
            className={`bg-gray-800/50 border-gray-700 text-white ${
              isDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 text-white">
            <SelectItem className="cursor-pointer" value="conversation">
              Conversation
            </SelectItem>
            <SelectItem className="cursor-pointer" value="creative">
              Creative Writing
            </SelectItem>
            <SelectItem className="cursor-pointer" value="sentiment">
              Sentiment Analysis
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-300 mb-2 flex items-center">
          <Cpu size={14} className="mr-1" />
          Model
        </label>
        <Select
          value={selectedModel}
          onValueChange={(value) => {
            onModelChange(value);
          }}
          disabled={
            isDisabled || !selectedCategory || availableModels.length === 0
          }
        >
          <SelectTrigger
            className={`bg-gray-800/50 border-gray-700 text-white ${
              isDisabled || !selectedCategory || availableModels.length === 0
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            <SelectValue
              placeholder={
                availableModels.length > 0
                  ? "Select model"
                  : "No models available"
              }
            />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 text-white max-h-[200px]">
            {availableModels.length > 0 ? (
              availableModels.map((model) => (
                <SelectItem
                  className="cursor-pointer"
                  key={model.id}
                  value={model.id}
                >
                  {model.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="no-models" disabled>
                No models available for this category
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
