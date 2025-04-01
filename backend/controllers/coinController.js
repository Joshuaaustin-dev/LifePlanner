import User from "../models/User.js";

export const deductCoins = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.coins < 10) {
      return res.status(400).json({ error: "Not enough coins to create a plan" });
    }

    user.coins -= 10;
    await user.save();

    res.json({ message: "Coins deducted successfully", coins: user.coins });
  } catch (error) {
    console.error("Error deducting coins:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
