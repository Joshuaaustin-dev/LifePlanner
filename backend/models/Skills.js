import mongoose from "mongoose";
const { Schema, model } = mongoose;
import daySchema from "./Day.js";

const skillsSchema = new Schema({
  name: String,
  day: [daySchema],
});

export default skillsSchema;
