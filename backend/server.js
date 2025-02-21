import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import bodyParser from "body-parser";
import { OpenAI } from "openai";
import User from "./models/User.js";
import calendarRoutes from "./routes/calendarRoutes.js";

config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use("/calendar-api", calendarRoutes);

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
        { date: "2025-02-01", content: "Learn useState and useEffect" },
        { date: "2025-02-02", content: "Build a basic component" },
        { date: "2025-02-03", content: "Manage state with useContext" },
        { date: "2025-02-04", content: "Learn React Router" },
        { date: "2025-02-05", content: "Create a dynamic list with React" },
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

// DEBUG User Registration via POST method
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    // Create a new user and save it
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error registering user");
  }
});

// DEBUG User login via POST method
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    //Checks if the username matches
    if (!user) {
      return res.status(400).send("User not found");
    }

    //Checks if the password of the user matches
    if (user.password !== password) {
      return res.status(400).send("Incorrect password");
    }

    // Response if the credentials match a
    res.status(200).json({
      message: "Login successful",
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in" });
  }
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
