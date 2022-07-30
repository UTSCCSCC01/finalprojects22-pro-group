import React, { useEffect, useState } from "react";
// import "./HistoryTag.css";

function HistoryTag({ stockSymbol, position }) {
    // stockSymbol is an array contains all history

    const [stock, setStock] = useState("");
    const [price, setPrice] = useState("");
    const [amount, setAmount] = useState("");
    const [time, setTime] = useState("");
    const [is_buy, setIsBuy] = useState("");

    useEffect(() => {
        // const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        const getData = async () => {
            // if (position === "t") {
            //     setPrice("Avg Price");
            //     setVolume("Volume");
            //     setW52High("52 Week High");
            //     setW52Low("52 Week Low");
            //     setChange("Change");
            //     setLow("Low");
            //     setOpen("Open");
            //     return;
            // }
            // if (!stockSymbol) return;
            if (position === "h") {
                setStock(stockSymbol.stock);
                setAmount(stockSymbol.amount);
                setPrice(stockSymbol.price);
                setTime(stockSymbol.time);
                setIsBuy(stockSymbol.is_buy.toString());
            } else if (position === "hh") {
                setStock("stock");
                setAmount("amount");
                setPrice("price");
                setTime("time");
                setIsBuy("is_buy");
            } else if (position === "s") {
                setStock(stockSymbol.symbol);
                setAmount(stockSymbol.amount);
                setPrice("");
                setTime("");
                setIsBuy("");
                // setPrice(stockSymbol.price);
            } else {
                // "sh"
                setStock("stock");
                setAmount("amount");
                setPrice("");
                setTime("");
                setIsBuy("");
            }
        };
        getData();
    }, [stockSymbol, position]);

    return (
        <div>
            <div className="border_2">
                <span className="st1">{stock}</span>
                <span className="st3">{amount}</span>
                <span className="st2">{price}</span>
                <span className="st4">{is_buy}</span>
                <span className="st5">{time}</span>
            </div>
        </div>
    );
}

export default HistoryTag;
