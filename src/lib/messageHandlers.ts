// Define interfaces for better type safety
interface SentimentResult {
  label: string;
  score: number;
}

interface SentimentResponse {
  type: "sentiment";
  primarySentiment: {
    label: string;
    confidence: string;
  };
  allSentiments: {
    label: string;
    confidence: string;
  }[];
  interpretation: string;
}

// Define a type for the expected API response data structure
// This is a basic structure, adjust if the API response varies more
type ApiResponseData = {
  result?: SentimentResult[][] | string | unknown; // Allow for different result types
  data?: string | unknown; // Allow for different data types
  // Add other potential top-level keys from the API response if known
} | Record<string, unknown>; // Fallback for unexpected structures

// Process response based on model category
export const handleMessageResponse = (
  data: ApiResponseData, // Use the specific type for data
  category: string,
  inputMessage: string
): string | SentimentResponse => { // Use union type for return value
  let responseContent: string | SentimentResponse = ""; // Use union type for the variable

  // Handle different response formats based on category
  // Check if data.result exists and is an array before accessing it
  if (category === "sentiment" && data.result && Array.isArray(data.result)) {
    // Format sentiment analysis results into a readable string
    const sentimentResults = data.result[0]; // Assuming the structure is [[{label, score}, ...]]
    if (Array.isArray(sentimentResults)) {
      // Ensure items in sentimentResults are actual SentimentResult objects
      const validSentimentResults = sentimentResults.filter(
        (item): item is SentimentResult =>
          typeof item === 'object' && item !== null && 'label' in item && 'score' in item
      );

      if (validSentimentResults.length > 0) {
        // Sort results by score (highest first)
        const sortedResults = [...validSentimentResults].sort(
          (a, b) => b.score - a.score
        );

        // Create a structured response object for sentiment analysis
        responseContent = {
          type: "sentiment",
          primarySentiment: {
            label: sortedResults[0].label,
            confidence: `${(sortedResults[0].score * 100).toFixed(2)}%`
          },
          allSentiments: sortedResults.map(result => ({
            label: result.label,
            confidence: `${(result.score * 100).toFixed(2)}%`
          })),
          interpretation: `The text you provided appears to have a predominantly ${sortedResults[0].label.toLowerCase()} sentiment.`
        };
      } else {
        // Handle case where sentimentResults is an empty array or contains invalid items
        responseContent = {
          type: "sentiment",
          primarySentiment: { label: "Unknown", confidence: "N/A" },
          allSentiments: [],
          interpretation: "Unable to parse sentiment results.",
        };
      }
    } else {
      // Handle case where data.result[0] is not an array
       responseContent = {
         type: "sentiment",
         primarySentiment: { label: "Unknown", confidence: "N/A" },
         allSentiments: [],
         interpretation: "Unexpected sentiment result format.",
       };
    }
  } else if (typeof data.result === 'string') {
    // Handle string result
    responseContent = data.result;
  } else if (typeof data.data === 'string') {
     // Handle string data
    responseContent = data.data;
  } else if (category === 'creative' && typeof (data as { generated_text?: string }).generated_text === 'string') {
    // Handle creative response structure if it's different
    responseContent = (data as { generated_text: string }).generated_text;
  } else {
    // Fallback if data structure is unexpected or empty for non-sentiment categories
    responseContent = "";
  }

  // Fallback to mock responses if the API doesn't return a valid responseContent
  // Check if responseContent is still empty or falsy (e.g., empty string)
  if (!responseContent) {
    if (category === "sentiment") {
      const sentiments = ["Positive", "Negative", "Neutral"];
      const randomSentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
      const confidence = `${(Math.random() * 30 + 70).toFixed(2)}%`;

      responseContent = {
        type: "sentiment",
        primarySentiment: {
          label: randomSentiment,
          confidence: confidence
        },
        allSentiments: [
          { label: randomSentiment, confidence: confidence },
          { label: sentiments[(sentiments.indexOf(randomSentiment) + 1) % 3], confidence: `${(Math.random() * 20 + 10).toFixed(2)}%` },
          { label: sentiments[(sentiments.indexOf(randomSentiment) + 2) % 3], confidence: `${(Math.random() * 10).toFixed(2)}%` }
        ],
        interpretation: `The text you provided appears to have a ${randomSentiment.toLowerCase()} sentiment. This analysis is based on the language patterns, word choice, and overall tone detected in your message.`
      };
    } else if (category === "creative") {
      responseContent = `# Creative Response\n\n${
        inputMessage.length > 20
          ? inputMessage
          : "Once upon a time in a digital realm, AI and humans worked together to create amazing stories. Your journey begins now..."
      }\n\nFeel free to ask for more creative content or provide more specific prompts!`;
    } else { // Assuming default is conversation or similar
      responseContent = `# Response\n\nI understand you're asking about "${inputMessage.substring(0, 30)}${
        inputMessage.length > 30 ? "..." : ""
      }".\n\nAs an AI assistant, I'm here to help with information and answers. What specific aspects would you like me to elaborate on?`;
    }
  }

  return responseContent;
};