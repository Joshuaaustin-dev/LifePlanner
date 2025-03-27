import User from "../models/User.js";

/**
 * @desc Add tokens to a user's account using email
 */
export const addTokens = async (req, res) => {
  const { email, tokens } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    user.Tokens += tokens;
    await user.save();

    res.status(200).json({ message: `Added ${tokens} tokens`, tokens: user.Tokens });
  } catch (error) {
    console.error("Error updating tokens:", error);
    res.status(500).send("Error updating tokens");
  }
};

/**
 * @desc Deduct tokens from a user's account using email
 */
export const deductTokens = async (req, res) => {
  const { email, tokens } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    if (user.Tokens < tokens) {
      return res.status(400).send("Not enough tokens");
    }

    user.Tokens -= tokens;
    await user.save();

    res.status(200).json({ message: `Deducted ${tokens} tokens`, tokens: user.Tokens });
  } catch (error) {
    console.error("Error deducting tokens:", error);
    res.status(500).send("Error deducting tokens");
  }
};
