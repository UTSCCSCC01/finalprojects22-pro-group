const express = require("express");
const router = express.Router();

const {
    login,
    register,
    user_list,
    logout,
    profile,
    reset_password,
} = require("../controllers/auth");

// sprint 1 apis
router.route("/").get(user_list);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile").get(profile);

// sprint 2 apis
router.route("/reset").post(reset_password);

module.exports = router;
