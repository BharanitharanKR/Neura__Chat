const apiKey = import.meta.env.VITE_API_KEY;
const apiKey = import.meta.env.VITE_API_KEY;
console.log("Loaded API Key:", apiKey); // ✅ Debug this

async function runChat(prompt) {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "anthropic/claude-3-sonnet", // or any other OpenRouter-supported model
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: prompt },
          ],
          temperature: 0.9,
          top_p: 1,
          max_tokens: 2048,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      return `API Error: ${errorData.error?.message || response.statusText}`;
    }

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content || "No response.";
    console.log("Chatbot Response:", message);
    return message;
  } catch (error) {
    console.error("Error in runChat:", error);
    return "An error occurred: " + error.message;
  }
}

export default runChat;
