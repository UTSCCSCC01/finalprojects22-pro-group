const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { StatusCodes } = require("http-status-codes");

const getMsg = async (req, res) => {
    try {
        const cookietoken = req.cookies["token"];
        if (!cookietoken) {
            // redirect to login page
            return res.status(400).send("No auth");
        }
        const { id } = jwt.verify(cookietoken, process.env.JWT_SECRET);
        const { email } = req.body;
        if (!id || !email) {
            const msgs = [];
            return res.send(JSON.stringify({ msgs }));
        }

        //TODO get msg from db
        const msgs = [
            { isMe: true, msg: "This is message #1" },
            { isMe: false, msg: "This is message #2" },
        ];
        return res.send(JSON.stringify({ msgs }));
    } catch (error) {
        console.log(error);
        const msgs = [];
        res.send(JSON.stringify({ msgs }));
    }
};

const sendMsg = async (req, res) => {
    try {
        const cookietoken = req.cookies["token"];
        if (!cookietoken) {
            // redirect to login page
            return res.status(400).send("No auth");
        }
        const { id } = jwt.verify(cookietoken, process.env.JWT_SECRET);
        const { email, message } = req.body;
        if (!id || !email || !message) {
            return res.status(400).send("Please provide correct Information");
        }

        //TODO store to db
        console.log(`Said ${message} to :${email}`);
    } catch (error) {
        console.log(error);
        const message = [];
        res.status(400);
    }
};

module.exports = {
    getMsg,
    sendMsg,
};
