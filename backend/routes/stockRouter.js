const express = require("express");
const router = express.Router();

const { buyStock } = require("../controllers/stock");

router.route("/buystock").post(buyStock);

module.exports = router;
