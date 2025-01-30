import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import bodyParser from "body-parser";
import { OpenAI } from "openai";


const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
config();
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// MongoDB connection string - Update this based on your cluster
const mongoURI = process.env.DB_URI;


app.post("/chat", async (req, res) => {
  const { prompt } = req.body;

  try {
      const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",  
          messages: [{ role: "user", content: prompt }],
          max_tokens: 512,
          temperature: 0.7
      });

      res.send(completion.choices[0].message.content);
  } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
  }
});

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Example route
app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
