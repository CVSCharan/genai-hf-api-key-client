import { ModelOption } from "@/types/types";

// Sample model options - Lightweight Hugging Face models with markdown support
export const modelOptions: ModelOption[] = [
  // Conversation models
  // {
  //   id: "TinyLlama/TinyLlama-1.1B-Chat-v1.0",
  //   name: "TinyLlama 1.1B Chat",
  //   category: "conversation",
  //   description:
  //     "Lightweight conversational model that supports markdown formatting",
  // },
  // {
  //   id: "microsoft/phi-1_5",
  //   name: "Phi-1.5",
  //   category: "conversation",
  //   description:
  //     "1.3B parameter model with strong markdown capabilities for general conversation",
  // },
  {
    id: "Qwen/Qwen1.5-0.5B-Chat",
    name: "Qwen 0.5B Chat",
    category: "conversation",
    description:
      "Efficient 0.5B parameter model with markdown support and good conversation abilities",
  },
  {
    id: "HuggingFaceH4/zephyr-7b-beta",
    name: "Zephyr 7B Beta",
    category: "conversation",
    description:
      "Optimized 7B model with excellent markdown support and conversational abilities",
  },

  // Creative models
  {
    id: "microsoft/Phi-3-mini-4k-instruct",
    name: "Phi-3 Mini (3.8B)",
    category: "creative",
    description:
      "Best balance of size (3.8B) and quality. Perfect for Markdown stories, dialogue, and worldbuilding.",
  },
  // {
  //   id: "HuggingFaceH4/zephyr-7b-beta-creative",
  //   name: "Zephyr 7B",
  //   category: "creative",
  //   description:
  //     "Quantized version fits under 10GB. Great for poetry and structured writing.",
  // },
  {
    id: "Qwen/Qwen1.5-0.5B-Chat-creative",
    name: "Qwen 0.5B Chat",
    category: "creative",
    description:
      "Tiny but surprisingly good at Markdown formatting for short stories.",
  },
  {
    id: "facebook/opt-1.3b",
    name: "OPT 1.3B",
    category: "creative",
    description:
      "Meta's 1.3B parameter model offering a good balance of quality and efficiency for creative writing tasks",
  },

  // Sentiment models
  {
    id: "distilbert-base-uncased-finetuned-sst-2-english",
    name: "DistilBERT Sentiment",
    category: "sentiment",
    description:
      "Lightweight sentiment analysis model (66M parameters) with basic markdown",
  },
  {
    id: "cardiffnlp/twitter-roberta-base-sentiment",
    name: "RoBERTa Sentiment",
    category: "sentiment",
    description:
      "125M parameter model fine-tuned for sentiment analysis with markdown output",
  },
  // {
  //   id: "SamLowe/roberta-base-go_emotions",
  //   name: "RoBERTa Emotions",
  //   category: "sentiment",
  //   description:
  //     "Base RoBERTa model fine-tuned for detailed emotion analysis with markdown formatting",
  // },
];
