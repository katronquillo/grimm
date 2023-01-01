const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaleSchema = new Schema({
  url: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  intro: {
    type: String,
    required: true,
  },
  wordFrequency: {
    type: Schema.Types.Mixed,
    required: true,
    default: {},
  },
});

mongoose.model("Tale", TaleSchema);
