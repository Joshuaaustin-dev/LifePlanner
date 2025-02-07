import mongoose from "mongoose";

const { Schema, model } = mongoose;

const daySchema = new Schema({
  date: {
    type: Date, 
    get: (v) => v.toISOSTring().split("T")[0]
  },
  content: String,
});

export default daySchema;
