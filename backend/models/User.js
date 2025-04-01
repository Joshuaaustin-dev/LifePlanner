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
  coins: {
    type: Number, 
    required: true,
    default: 0,
  },
  profilePicture: { type: String, default: ""},
  location: { type: String, default: ""},
  bio: { type: String, default: ""},
  skills: [skillsSchema],
  achievements: [String],
  createdAt: { type: Date, default: Date.now}, 
  lastLogin: { type: Date, default: null}, 
  loginStreak: { type: Number, default: 0 }
  
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;