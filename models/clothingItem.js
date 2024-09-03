const mongoose = require("mongoose");
const validator = require("validator");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "This field is required"],
    minlength: 2,
    maxlength: 30,
  },
  weather: {
    type: String,
    required: [true, "This field is required"],
    enum: ["hot", "warm", "cold"],
  },
  imageUrl: {
    type: String,
    required: [true, "This field is required"],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "This field is required"],
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("item", itemSchema);
