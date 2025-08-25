import { createContext, useState } from "react";

export const Context = createContext(); // ✅ context object

// 👇 renamed this so it's not the same name
const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  // Typing animation effect
  const delayPara = (index, nextChar) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextChar);
    }, 10 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResults(false);
    setResultData("");
    setInput("");
    setRecentPrompt("");
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResults(true);

    try {
      const textPrompt = prompt ?? input;

      if (!prompt) {
        setPrevPrompts((prev) => [...prev, input]);
      }
      setRecentPrompt(textPrompt);

      // ✅ Call your Express backend
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant skilled in code and text.",
            },
            { role: "user", content: textPrompt },
          ],
        }),
      });

      const data = await response.json();
      const rawReply =
        data?.choices?.[0]?.message?.content || "⚠️ No response from API.";

      // --- Formatting ---
      let formatted = rawReply
        .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // bold
        .replace(/\*(.*?)\*/g, "<i>$1</i>") // italic
        .replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>") // code
        .replace(/\n/g, "<br/>"); // line breaks

      // --- Typing animation ---
      formatted.split("").forEach((char, i) => delayPara(i, char));
    } catch (error) {
      console.error("❌ Error while running chat:", error);
      setResultData("❌ Error fetching response.");
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    input,
    setInput,
    showResults,
    loading,
    resultData,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
