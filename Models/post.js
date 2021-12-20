const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  name: String, // String is shorthand for {type: String}
  gender: String,
  age: Number,
  date: { type: Date, default: Date.now },
  hidden: { type: Boolean, default: false },
});

module.exports = mongoose.model("Post", postSchema);