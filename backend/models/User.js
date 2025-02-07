import mongoose from "mongoose";
import skillsSchema from "./Skills.js";

//Define the schema for the user
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  skills: [skillsSchema],
});

const User = mongoose.model("User", userSchema);

export default User;