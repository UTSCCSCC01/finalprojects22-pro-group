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
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        console.log("register success");
        const token = user.createJWT();
        res.cookie("token", token, {
            maxAge: process.env.TOKEN_EXPIRY,
            httpOnly: false,
        }).send(user);
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
    console.log("login success");
    const token = user.createJWT();
    res.cookie("token", token, {
        maxAge: process.env.TOKEN_EXPIRY,
        httpOnly: false,
    }).send(user);
};

const logout = async (req, res) => {
    const cookietoken = req.cookies["token"];
    if (!cookietoken) {
        console.log("no cookie");
        // redirect to login page
        return res.send("No auth");
    }
    const { id } = jwt.verify(cookietoken, process.env.JWT_SECRET);
    req.user = await User.findById(id);
    res.clearCookie("token");
    console.log("logout success");
    res.send(req.user);
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

const find_friends = async (req, res) => {
    try {
        // const cookietoken = req.cookies["token"];
        // if (!cookietoken) {
        //     // redirect to login page
        //     return res.send("No auth");
        // }
        // const { id } = jwt.verify(cookietoken, process.env.JWT_SECRET);
        const { id } = req.body;
        console.log(id);
        const user_data = await User.findById(id);
        // console.log(user_data);
        const friend_array = user_data.friends;
        const result_array = [];
        // friend_array.forEach(async (element) => {
        //     //console.log(element);
        //     var temp = await User.findById(element);
        //     console.log(temp);
        //     result_array.push(temp.email);
        //     console.log(result_array);
        // });

        for (let i = 0; i < friend_array.length; i++) {
            var temp = await User.findById(friend_array[i]);
            console.log(temp);
            let temp_array = [];
            temp_array.push(temp.name);
            temp_array.push(temp.email);
            result_array.push(temp_array);
            console.log(result_array);
        }
        console.log("123");
        console.log(result_array);
        return res.status(200).json({ list: result_array });
    } catch (error) {
        console.log(error);
        res.status(400).send("Cannot add friend!");
    }
};

const search_friend = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).send("Please provide correct Information");
        }
        const friend_user = await User.findOne({ email });
        if (!friend_user) {
            return res
                .status(400)
                .send("This user doesn't exist. Please use another email ~");
        }
        // find the email, return email and username
        console.log(friend_user);

        const email_result = email;
        const name_result = friend_user.name;
        const result_array = [];
        result_array.push(name_result);
        result_array.push(email_result);

        console.log(result_array);
        return res.status(200).json({ info: result_array });
    } catch (error) {
        console.log(error);
        res.status(400).send("Cannot find friend!");
    }
};

const add_friends = async (req, res) => {
    try {
        const { id, email } = req.body;
        if (!id || !email) {
            return res.status(400).send("Please provide correct Information");
        }
        const friend_user = await User.findOne({ email });
        if (!friend_user) {
            return res.send(
                "This user doesn't exist. Please use another email ~"
            );
        }
        const my_id = await User.findOne({ id });
        if (!my_id) {
            return res.send(
                "This user doesn't exist. Please use another email ~"
            );
        }
        const add_id = friend_user._id;
        if (my_id.friends.includes(add_id)) {
            return res.status(400).send("already in friend list");
        }

        User.findOneAndUpdate(
            { _id: id },
            { $push: { friends: add_id } },
            function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            }
        );
        const result = await User.findOne({ id });
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.send("Cannot add friend!");
    }
};

module.exports = {
    login,
    register,
    user_list,
    logout,
    profile,
    find_friends,
    search_friend,
    add_friends,
};
