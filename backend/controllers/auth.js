const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");

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
    res
      .cookie("token", token, {
        maxAge: process.env.TOKEN_EXPIRY,
        httpOnly: false,
      })
      .send(user);
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
  res
    .cookie("token", token, {
      maxAge: process.env.TOKEN_EXPIRY,
      httpOnly: false,
    })
    .send(user);
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

// working, but no error handling
// need email and password to change password
// if the password is the same, don't change
const reset_password = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Please provide email and password!");
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send("This user doesn't exist. Please use another email ~");
  }
  const correctPswd = await user.pswdCorrect(password);
  if (correctPswd) {
    return res.status(400).send("Cannot use the same password");
  }
  const salt = await bcrypt.genSalt(10);
  var hash_pass = await bcrypt.hash(password, salt);

  const filter = { email: `${email}` };
  const update = { password: hash_pass };
  let doc = await User.findOneAndUpdate(filter, update, {
    new: true,
  });

  const token = user.createJWT();
  res
    .cookie("token", token, {
      maxAge: process.env.TOKEN_EXPIRY,
      httpOnly: false,
    })
    .status(200)
    .send(user);

  console.log("end");
};

module.exports = {
  login,
  register,
  user_list,
  logout,
  profile,
  reset_password,
};
