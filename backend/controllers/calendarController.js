import axios from "axios";

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
