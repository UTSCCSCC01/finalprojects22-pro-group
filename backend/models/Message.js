const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: [true, "Please provide name"],
        maxlength: 50,
        minlength: 3,
    },
});

const Message = mongoose.model("Message", MessageSchema);
module.exports = { Message };
