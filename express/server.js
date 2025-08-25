import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages,
          temperature: 0.7,
          max_tokens: 1024,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      res.json(data);
    } else {
      console.error("Groq API error:", data);
      res.status(400).json(data);
    }
  } catch (err) {
    console.error("Error in /api/chat:", err);
    res.status(500).json({ error: err.message });
  }
});

// Use .env PORT or fallback to 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
