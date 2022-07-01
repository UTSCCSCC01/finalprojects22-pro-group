const express = require("express");
const router = express.Router();

const {
    login,
    register,
    user_list,
    logout,
    profile,

    reset_password,

    find_friends,
    find_friend_in,
    find_friend_out,
    search_friend,
    add_friends,
    accept_friend,
    reject_friend,

} = require("../controllers/auth");

// sprint 1 apis
router.route("/").get(user_list);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile").get(profile);
router.route("/findf").post(find_friends);
router.route("/findfin").post(find_friend_in);
router.route("/findfout").post(find_friend_out);
router.route("/searchf").post(search_friend);
router.route("/addf").post(add_friends);
router.route("/acceptf").post(accept_friend);
router.route("/rejectf").post(reject_friend);

// sprint 2 apis
router.route("/reset").post(reset_password);

module.exports = router;
