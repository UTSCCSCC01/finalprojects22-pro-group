const express = require("express");
const router = express.Router();

const { buyStock, getBalance, getBought } = require("../controllers/stock");

router.route("/buystock").post(buyStock);
router.route("/getBalance").get(getBalance);
router.route("/getBought").get(getBought);

module.exports = router;
