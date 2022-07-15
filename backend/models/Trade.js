const mongoose = require("mongoose");

const TradeSchema = new mongoose.Schema({
    uid: {
        type: String,
    },

    balance:{
        type: Double,

    },

    stocks:{
        type: Array,
    },


});


const Trade = mongoose.model("Trade", TradeSchema);
module.exports = { Trade };