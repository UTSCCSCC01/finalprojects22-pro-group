const express = require("express");
const router = express.Router();

const {
    login,
    register,
    user_list,
    logout,
    profile,
    find_friends,
    add_friends,
    search_friend,
} = require("../controllers/auth");

router.route("/").get(user_list);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile").get(profile);
router.route("/findf").get(find_friends);
router.route("/searchf").get(search_friend);
router.route("/addf").get(add_friends);

module.exports = router;
