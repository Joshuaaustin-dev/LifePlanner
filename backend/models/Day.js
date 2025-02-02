import mongoose from "mongoose";
const { Schema, model } = mongoose;

const daySchema = new Schema({
  date: Date,
  content: String,
});

export default daySchema;
