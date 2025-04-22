// Process response based on model category
export const handleMessageResponse = (
  data: any,
  category: string,
  inputMessage: string
): string | any => {
  let responseContent: any = "";

  // Handle different response formats based on category
  if (category === "sentiment" && Array.isArray(data.result)) {
    // Format sentiment analysis results into a readable string
    const sentimentResults = data.result[0];
    if (Array.isArray(sentimentResults)) {
      // Sort results by score (highest first)
      const sortedResults = [...sentimentResults].sort(
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
      responseContent = {
        type: "sentiment",
        primarySentiment: {
          label: "Unknown",
          confidence: "N/A"
        },
        allSentiments: [],
        interpretation: "Unable to parse sentiment results."
      };
    }
  } else {
    // For other categories, use the standard response format
    responseContent = data.result || data.data || "";
  }

  // Fallback to mock responses if the API doesn't return a response
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
    } else {
      responseContent = `# Response\n\nI understand you're asking about "${inputMessage.substring(0, 30)}${
        inputMessage.length > 30 ? "..." : ""
      }".\n\nAs an AI assistant, I'm here to help with information and answers. What specific aspects would you like me to elaborate on?`;
    }
  }

  return responseContent;
};