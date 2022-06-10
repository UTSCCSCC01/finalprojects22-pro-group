const express = require("express");
const router = express.Router();

const {
  login,
  register,
  see_all_users,
} = require("../controllers/auth");

router.route("/").get(see_all_users);
router.route("/register").post(register);
router.route("/login").post(login);


module.exports = router;
