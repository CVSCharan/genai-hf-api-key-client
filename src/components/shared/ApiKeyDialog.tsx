"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Sparkles } from "lucide-react";

interface ApiKeyDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  triggerButton?: React.ReactNode;
}

export function ApiKeyDialog({
  isOpen,
  onOpenChange,
  apiKey,
  setApiKey,
  handleSubmit,
  triggerButton,
}: ApiKeyDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 text-lg cursor-pointer">
            <Sparkles className="h-5 w-5 mr-2" />
            Try Now
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">
            Enter Your API Key
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Provide your Hugging Face API key to start using GenAI
            capabilities.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input
            type="password"
            placeholder="Enter your Hugging Face API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
          />
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3"
          >
            Start Creating with AI
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}