import axios from "axios";
import User from "../models/User.js";

export const retrieveSkills = async (req, res) => {
  const userData = req.body;
  const response = await axios.post("http://localhost:5000/get-user", userData);
  const user = response.data;
  if (user == null || user.skills == null) {
    res.status(500).send("Error retrieving user");
  }
  if (user.skills.length === 0) {
    res.json({ skills: user.skills });
  } else {
    let userSkills = user.skills;
    res.json({ skills: userSkills });
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
