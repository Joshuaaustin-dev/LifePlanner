import axios from "axios";

export const retrieveSkills = async (req, res) => {
  const response = await axios.get("http://localhost:5000/dummy");
  const user = response.data;
  console.log(user);
  if (user.skills == null) {
    res.json("Failed to retrieve");
  }
  let userSkills = user.skills;
  res.json({ skills: userSkills });
};
