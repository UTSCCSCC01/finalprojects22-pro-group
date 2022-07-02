import React from "react";
import Stock from "./Stock";
import "./StockFeed.css";

function StockFeed() {
    const stocks = ["META", "GOOG", "AAPL", "ABNB", "AMZN", "MSFT"];

    return (
        <div className="feed">
            <div className="feedHeader">
                <h2> Stocks</h2>
            </div>
            {/* <SearchBox/> */}
            <div>
                {stocks.map((stockSymbol) => (
                    <Stock stockSymbol={stockSymbol} />
                ))}
            </div>
        </div>
    );
}

export default StockFeed;
