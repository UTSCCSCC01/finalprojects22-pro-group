const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
    maxlength: [20, "name can not be more than 20 characters"],
  },
  password: {
    type: String,
    required: [true, "must provide name"],
  },
});

module.exports = mongoose.model("User", UserSchema);
