import React from "react";
import Stock from "./Stock";
import "./StockFeed.css";
import { useEffect, useState } from "react";
function StockFeed() {
    // const stocks = ["META", "GOOG", "AAPL", "ABNB", "TSLA", "MSFT"];
    //const stocks = ["META", "GOOG", "AAPL"];

    const [watchList, setWatchList] = useState([]);

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    useEffect(() => {
        getList();
        sleep(1000);
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
                    if (data.list.length != 0) {
                        setWatchList(data.list);
                    } else {
                        setWatchList(["aapl", "tsla", "meta"]);
                    }
                    console.log(watchList);
                }
            })
            .catch((error) => {
                console.log("error occured in login fetch");
            });
    };

    // const getStocks = () => {
    //     let list = [];
    //     watchList.forEach((stockSymbol) => {
    //         sleep(1000);
    //         list.push(<Stock key={stockSymbol} stockSymbol={stockSymbol} />);
    //     });
    //     return list;
    // };

    const STocks = watchList.forEach((stockSymbol) => {
        sleep(1000);
        return <Stock key={stockSymbol} stockSymbol={stockSymbol} />;
    });

    return (
        <div className="feed">
            <div className="feedHeader">
                <h2> Stocks</h2>
            </div>
            {/* <SearchBox/> */}
            <div>
                {watchList.map((stockSymbol) => (
                    <Stock key={stockSymbol} stockSymbol={stockSymbol} />
                ))}
            </div>
        </div>
    );
}

export default StockFeed;
