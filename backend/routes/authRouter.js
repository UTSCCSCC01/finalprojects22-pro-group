const express = require("express");
const router = express.Router();

const {
    login,
    register,
    user_list,
    logout,
    profile,
} = require("../controllers/auth");

router.route("/").get(user_list);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile").get(profile);

module.exports = router;
