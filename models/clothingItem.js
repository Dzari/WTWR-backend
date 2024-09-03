const mongoose = require("mongoose");
const validator = require("validator");

const required = [true, "This field is required"];

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: required,
    minlength: 2,
    maxlength: 30,
  },
  weather: {
    type: String,
    required: required,
    enum: ['hot', 'warm', 'cold'],
  },
  imageUrl: {
    type: String,
    required: required,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: required,
  },
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  createdAt: {
    type: Date = Date.now
  }
});

module.exports = mongoose.model("item", itemSchema);
