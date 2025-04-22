import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { KeyRound } from "lucide-react";
import { useDemoContext } from "@/contexts/DemoContext";
import { Key } from "lucide-react";
import { ApiKeyInputProps } from "@/types/types";

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({
  apiKeyRef,
  tourStep,
  nextTourStep,
}) => {
  const { apiKey, setApiKey, validateApiKey } = useDemoContext();

  return (
    <div className="space-y-2 relative" ref={apiKeyRef}>
      <label className="text-sm text-gray-300 mb-2 flex items-center">
        <Key size={14} className="mr-1" />
        Huggingface API Key
      </label>
      <div className="flex">
        <Input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your API key"
          className="bg-gray-800/50 border-0 focus:ring-1 focus:ring-purple-500 text-white rounded-l-md"
        />
        <Button
          onClick={() => {
            validateApiKey();
            if (tourStep === 1) nextTourStep();
          }}
          className={`bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-l-none ${
            tourStep === 1
              ? "ring-2 ring-purple-300 ring-opacity-70 animate-pulse"
              : ""
          }`}
        >
          <KeyRound size={18} />
        </Button>
      </div>
    </div>
  );
};
