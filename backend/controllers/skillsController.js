import User from "../models/User.js";

export const updateContent = async (req, res) => {
  try {
    const { user, dayID, content } = req.body;

    if (!user || !dayID || content === undefined) {
      return res.status(400).send("Invalid request parameters");
    }

    const result = await User.findOneAndUpdate(
      { email: user.email, "skills.day._id": dayID },
      { $set: { "skills.$.day.$[d].content": content } },
      {
        arrayFilters: [{ "d._id": dayID }],
        new: true,
      }
    );

    if (!result) {
      return res.status(404).send("User or skill not found");
    }
    res.status(200).send("Updated.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Could not update day");
  }
};

export const deleteDay = async (req, res) => {
  try {
    const { user, dayID } = req.body;

    const result = await User.updateOne(
      { email: user.email },
      { $pull: { "skills.$[].day": { _id: dayID } } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).send("Day not found");
    }

    res.status(200).send("Day deleted.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Could not delete day");
  }
};
