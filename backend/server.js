import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import bodyParser from "body-parser";
import { OpenAI } from "openai";
import User from "./models/User.js";

config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// MongoDB connection string - Update this based on your cluster
const mongoURI = process.env.DB_URI;

/////////////// To test requests to database and ai
const dummyUser = {
  name: "Dummy",
  password: "password",
  email: "dummy@example.com",
  skills: [
    {
      name: "React",
      day: [
        { date: "2025-01-01", content: "Learn useState and useEffect" },
        { date: "2025-01-02", content: "Build a basic component" },
        { date: "2025-01-03", content: "Manage state with useContext" },
        { date: "2025-01-04", content: "Learn React Router" },
        { date: "2025-01-05", content: "Create a dynamic list with React" },
      ],
    },
  ],
};

app.get("/delete-dummy", async (req, res) => {
  try {
    const result = await User.deleteOne({ email: "dummy@example.com" });
    if (result.deletedCount === 1) {
      res.status(200).send("Deleted");
    } else {
      res.status(200).send("Failed");
    }
  } catch (err) {
    res.status(500).send("Error deleting user");
    console.log(err);
  }
});

app.get("/create-dummy", async (req, res) => {
  try {
    // Check if user exists
    const user = await User.findOne({ email: dummyUser.email });

    if (!user) {
      console.log("User not exist");
      const user = new User(dummyUser);
      await user.save();
    }
    res.json(dummyUser);
  } catch (err) {
    res.status(500).send("Error updating or creating user");
    console.log(err);
  }
});

app.get("/dummy", async (req, res) => {
  try {
    const user = await User.findOne({ email: dummyUser.email });
    if (user) {
      res.json(user);
    } else {
      res.send(null);
    }
  } catch (err) {
    res.status(500).send("Error updating or creating user");
    console.log(err);
  }
});

app.post("/add-skill", async (req, res) => {
  try {
    const { email, skill } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(500).send("User not found");
    }

    console.log(user.skills.length);
    if (user.skills.length <= 2) {
      //const raw = JSON.stringify(skill);
      //const clean = raw.replace(/[\\\n]/g, "");
      user.skills.push(skill);
      //console.log(user.skills);
      await user.save();
      res.json(skill);
    } else {
      console.log("skills array full");
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
