import mongoose from "mongoose";

const { Schema, model } = mongoose;

const daySchema = new Schema({
  date: {
    type: Date, 
    get: (v) => v.toISOString().split("T")[0],
  },
  content: String,
  completed:{
    type: Boolean, 
    default: false,
  }
});

export default daySchema;
