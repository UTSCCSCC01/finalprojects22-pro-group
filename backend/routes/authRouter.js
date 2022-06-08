const express = require("express");
const router = express.Router();

const { register, user_list } = require("../controllers/auth");

router.route("/").get(user_list);
router.route("/register").post(register);

module.exports = router;
