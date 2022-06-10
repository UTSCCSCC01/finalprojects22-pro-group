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

const logout = async (req, res) => {
    const cookietoken = req.cookies["token"];
    if (!cookietoken) {
        // redirect to login page
        return res.send("No auth");
    }
    const { id } = jwt.verify(cookietoken, process.env.JWT_SECRET);
    req.user = await User.findById(id);
    res.clearCookie("token");
    res.send([req.user, "Logout"]);
};

const profile = async (req, res) => {
    const cookietoken = req.cookies["token"];
    if (!cookietoken) {
        // redirect to login page
        return res.send("No auth");
    }
    const { id } = jwt.verify(cookietoken, process.env.JWT_SECRET);
    req.user = await User.findById(id);
    res.send(req.user);
};

module.exports = {
    login,
    register,
    user_list,
    logout,
    profile,
};
