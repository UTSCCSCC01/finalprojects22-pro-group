const User = require("../models/User");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");
const login_function = asyncWrapper(async (req, res) => {
  const users = await User.find({});
  res.status(200).json({ users });
});
const logout_function = asyncWrapper(async (req, res) => {
  const users = await User.find({});
  res.status(200).json({ users });
});
const register_function = asyncWrapper(async (req, res) => {
  const users = await User.create(req.body);
  res.status(200).json({ users });
});

module.exports = {
  login_function,
  logout_function,
  register_function,
};
