const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { StatusCodes } = require("http-status-codes");

const user_list = async (req, res) => {
    const users = await User.find();
    if (!users) {
        return res.send("No users");
    }
    res.send(users);
};

const register = async (req, res) => {
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        const token = user.createJWT();
        res.cookie("token", token, { maxAge: process.env.TOKEN_EXPIRY }).send([
            user,
            token,
            "Register",
        ]);
    } catch (error) {
        console.log(error);
        res.send("Cannot Register!");
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.send("Please provide email and password!");
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.send("This user doesn't exist. Please use another email ~");
    }
    const correctPswd = await user.pswdCorrect(password);
    if (!correctPswd) {
        return res.send("Wrong password");
    }
    const token = user.createJWT();
    res.cookie("token", token, { maxAge: process.env.TOKEN_EXPIRY }).send([
        user,
        token,
        "Login",
    ]);
};

const logout = async (req, res) => {};

module.exports = {
    login,
    register,
    user_list,
    logout,
};
