import mongoose from "mongoose";
import daySchema from "./Day.js";

const { Schema, model } = mongoose;

const skillsSchema = new Schema({
  name: String,
  day: [daySchema],
});

export default skillsSchema;
