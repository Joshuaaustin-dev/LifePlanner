import axios from "axios";
import User from "../models/User.js";

export const retrieveSkills = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "-password"
    );
    if (user === undefined || user.skills == null) {
      throw "No existing user";
    }
    if (user.skills.length === 0) {
      return res.json({ skills: user.skills });
    } else {
      let userSkills = user.skills;
      return res.json({ skills: userSkills });
    }
  } catch (error) {
    return res.json({ message: error });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const { user, skillID, date } = req.body;

    const dateValue = date === null || date === undefined ? new Date(0) : date;

    const result = await User.findOneAndUpdate(
      { email: user.email, "skills.day._id": skillID },
      { $set: { "skills.$.day.$[d].date": dateValue } },
      {
        arrayFilters: [{ "d._id": skillID }],
        new: true,
      }
    );

    if (!result) {
      return res.status(404).send("User or skill not found");
    }
    res.status(200).send("Updated.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Could not update skill");
  }
};
