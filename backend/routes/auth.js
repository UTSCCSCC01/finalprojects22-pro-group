const express = require("express");
const router = express.Router();

const {
  login_function,
  register_function,
  logout_function,
} = require("../controllers/auth");

router.route("/").get(login_function);
router.route("/register").post(register_function);
router.route("/logout").get(logout_function);

module.exports = router;
