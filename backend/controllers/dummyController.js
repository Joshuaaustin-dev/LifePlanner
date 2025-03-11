import User from "../models/User.js";

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

export const dummy = async (req, res) => {
  try {
    const user = await User.findOne({ email: dummyUser.email });
    res.json(user || null);
  } catch (err) {
    res.status(500).send("Error updating or creating user");
    console.log(err);
  }
};

export const createDummy = async (req, res) => {
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
};

export const deleteDummy = async (req, res) => {
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
};
