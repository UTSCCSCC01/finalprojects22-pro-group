import React from "react";
import Stock from "./Stock";
import "./StockFeed.css";
import { useEffect, useState } from "react";
function StockFeed() {
    // const stocks = ["META", "GOOG", "AAPL", "ABNB", "TSLA", "MSFT"];
    //const stocks = ["META", "GOOG", "AAPL"];
    const [watchList, setWatchList] = useState([]);
    useEffect(() => {
        getList();
    }, []);

    const getList = () => {
        fetch("http://localhost:5050/api/getWatchList", {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.list) {
                    setWatchList(data.list);
                    console.log(watchList);
                }
            })
            .catch((error) => {
                console.log("error occured in login fetch");
            });
    };

    return (
        <div className="feed">
            <div className="feedHeader">
                <h2> Stocks</h2>
            </div>
            {/* <SearchBox/> */}
            <div>
                {watchList.map((stockSymbol) => (
                    <Stock stockSymbol={stockSymbol} />
                ))}
            </div>
        </div>
    );
}

export default StockFeed;
