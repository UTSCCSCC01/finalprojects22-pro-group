const { User } = require("../models/User");
const { Trade } = require("../models/Trade");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { StatusCodes } = require("http-status-codes");

const buyStock = async (req, res) => {
  try {
    const cookietoken = req.cookies["token"];
    if (!cookietoken) {
      console.log("no cookie");
      // redirect to login page
      return res.send("No auth");
    }
    const { id } = jwt.verify(cookietoken, process.env.JWT_SECRET);
    if (!id) {
      res.status(400).send("No auth");
    }
    const { stock, price, amount } = req.body;
    if (!stock || !price || !amount) {
      res.status(400).send("Need balance, stock, price and amount");
    }

    const trade = await Trade.findOne({ uid: id });
    var stocks = trade.stocks;
    // Update Balance
    var new_balance = trade.balance - price * amount;
    Trade.findOneAndUpdate(
      { uid: id },
      { $set: { balance: new_balance } },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
      }
    );

    // Update stock amount
    function isStock(stock) {
      return stock.symbol === { stock };
    }
    const found = stocks.find(isStock);

    //stock is in the array
    if (isStock != undefined) {
      var new_amount = found.amount + amount;
      Trade.findOneAndUpdate(
        { uid: id, "stocks.symbol": stock },
        { $set: { "stocks.amount": new_amount } },
        function (error, success) {
          if (error) {
            console.log(error);
          } else {
            console.log(success);
          }
        }
      );
    } else {
      var new_amount = amount;
      Trade.findOneAndUpdate(
        { uid: id },
        { $push: { "stocks": {symbol: stock, amount: new_amount} } },
        function (error, success) {
          if (error) {
            console.log(error);
          } else {
            console.log(success);
          }
        }
      );
    }

    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400).send("Cannot find friend!");
  }
};




module.exports = { buyStock };
