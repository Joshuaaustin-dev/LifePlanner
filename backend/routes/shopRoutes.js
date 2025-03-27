import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/buy-ticket", async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Assuming 1 dollar = 10 tokens (modify as needed)
    const tokensToAdd = amount;
    user.Tokens += tokensToAdd;
    await user.save();

    res.json({ message: `Added ${tokensToAdd} tokens`, tokens: user.Tokens });
  } catch (error) {
    console.error("Error adding tokens:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.get("/get-user-tokens/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ tokens: user.Tokens });
  } catch (error) {
    console.error("Error fetching user tokens:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.post("/deduct-tokens", async (req, res) => {
  try {
    const { userId, tokens } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.Tokens < tokens) {
      return res.status(400).json({ message: "Not enough tokens" });
    }

    user.Tokens -= tokens;
    await user.save();

    res.json({ message: `Deducted ${tokens} tokens`, tokens: user.Tokens });
  } catch (error) {
    console.error("Error deducting tokens:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
