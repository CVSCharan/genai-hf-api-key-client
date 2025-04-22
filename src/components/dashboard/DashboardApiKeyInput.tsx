import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Key } from "lucide-react";
import { DashboardApiKeyInputProps } from "@/types/types";

export const DashboardApiKeyInput: React.FC<DashboardApiKeyInputProps> = ({
  value,
  onChange,
}) => {
  const [showKey, setShowKey] = useState(false);

  const toggleShowKey = () => {
    setShowKey(!showKey);
  };

  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-300 mb-2 flex items-center">
        <Key size={14} className="mr-1" />
        Huggingface API Key
      </label>
      <div className="relative">
        <Input
          type={showKey ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your API key"
          className="bg-gray-800/50 border-gray-700 text-white pr-10"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={toggleShowKey}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-white cursor-pointer"
        >
          {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
        </Button>
      </div>
    </div>
  );
};
