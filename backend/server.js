import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import bodyParser from "body-parser";
import { OpenAI } from "openai";
import User from "./models/User.js";

// Routes
import calendarRoutes from "./routes/calendarRoutes.js";
import dummyRoutes from "./routes/dummyRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import shopRoutes from "./routes/shopRoutes.js";

config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use("/calendar-api", calendarRoutes);
app.use("/", dummyRoutes);
app.use("/", userRoutes);
app.use("/", shopRoutes);

// MongoDB connection string - Update this based on your cluster
const mongoURI = process.env.DB_URI;

app.post("/add-skill", async (req, res) => {
  try {
    const { email, skill } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(500).send("User not found");
    }

    if (user.skills.length <= 2) {
      //const raw = JSON.stringify(skill);
      //const clean = raw.replace(/[\\\n]/g, "");
      user.skills.push(skill);
      //console.log(user.skills);
      await user.save();
      res.status(200).json(skill);
    } else {
      res.status(400).send({ message: "error" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Couldn't add skill");
  }
});

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 512,
      temperature: 0.1,
    });

    res.send(completion.choices[0].message.content);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

//updates completed skills
app.patch("/update-goal/:id", async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const user = await User.findOne({ "skills.day._id": id });
    if (!user) {
      return res.status(404).json({ message: "User or Goal not found" });
    }

    const goal = user.skills
      .flatMap((skill) => skill.day)
      .find((goal) => goal._id.toString() === id);

    if (goal) {
      goal.completed = completed;
      await user.save();
      res.json({ message: "Goal updated", goal });
    } else {
      res.status(404).json({ message: "Goal not found" });
    }
  } catch (err) {
    console.error("Error updating goal:", err);
    res.status(500).send("Error updating goal");
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

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
