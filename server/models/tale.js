import mongoose from "mongoose";
import { Schema } from mongoose

const TaleSchema = new Schema({
  url: {
    type: String, 
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  pageRank: {
    type: Number, 
    default: -1
  }
});

mongoose.model("Tale", TaleSchema);