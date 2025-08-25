import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// Get API key from environment variables
const apiKey = import.meta.env.VITE_API_KEY;

async function runChat(prompt) {
  try {
    // Initialize Generative AI instance
    const genAI = new GoogleGenerativeAI(apiKey);

    // Try with a different model name - PaLM API model
    const MODEL_NAME = "gemini-1.5-pro";

    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    // For text models (like text-bison), you might need to use generateContent directly
    // instead of startChat which is more for chat models
    try {
      // First try with chat functionality
      const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [],
      });

      const result = await chat.sendMessage(prompt);
      const response = result.response.text();
      console.log("Chatbot Response:", response);
      return response;
    } catch (chatError) {
      console.warn(
        "Chat method failed, falling back to direct content generation:",
        chatError
      );

      // Fallback to direct content generation if chat doesn't work
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig,
        safetySettings,
      });

      const response = result.response.text();
      console.log("Content Generation Response:", response);
      return response;
    }
  } catch (error) {
    console.error("Error in runChat:", error);

    // Provide a more helpful error message
    if (error.message && error.message.includes("not found for API version")) {
      return "API Error: The model specified is not available with your API key or version. Try using a different model like 'text-bison' or check your API key permissions.";
    }

    return "An error occurred: " + error.message;
  }
}

// Optional: Adding a function to check which models are available
// Note: This isn't a standard API method, but some API versions might support it
async function checkAvailableModels() {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);

    // This is not a standard method in the current SDK, but added for documentation
    // You might need to use a different API endpoint to list models
    console.log("Checking for alternative ways to list models...");

    // Try to generate content with a diagnostic prompt that might return model info
    const model = genAI.getGenerativeModel({ model: "text-bison" });
    const result = await model.generateContent(
      "What models are available in this API?"
    );
    console.log("Model information response:", result.response.text());

    return "Check console for model information";
  } catch (error) {
    console.error("Error checking models:", error);
    return "Cannot retrieve model list: " + error.message;
  }
}

export { runChat as default, checkAvailableModels };
