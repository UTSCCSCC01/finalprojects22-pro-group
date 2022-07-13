const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: [true, "Please provide message"],
        // maxlength: 100,
        // minlength: 1,
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        // match: [
        //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        //     "Please provide a valid email",
        // ]
    },
    time:{
        type: Date,
        required: [true, "Please provide time"],
    }
});

const Message = mongoose.model("Message", MessageSchema);
module.exports =  Message ;
