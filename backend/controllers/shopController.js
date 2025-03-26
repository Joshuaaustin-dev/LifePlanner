export const updateTokens = async (req, res) => {
  const { email, tokens } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { tokens },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Tokens updated", tokens: user.tokens });
  } catch (error) {
    res.status(500).json({ message: "Error updating tokens", error });
  }
};
