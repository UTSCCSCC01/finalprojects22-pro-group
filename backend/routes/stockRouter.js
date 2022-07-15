const express = require("express");
const router = express.Router();

const { buyStock, getBalance } = require("../controllers/stock");

router.route("/buystock").post(buyStock);
router.route("/getBalance").get(getBalance);

module.exports = router;
