import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import uuid from "react-uuid";

import Sidebar from "./Sidebar";
import "./PaperTrading.css";

const StyledInput = styled.input`
    display: block;
    margin: 20px 0px;
    border: 1px solid lightblue;
`;

function PaperTrading() {
    const [value, setValue] = useState("");

    const [balance, setBalance] = useState(100000);

    const [cost, setCost] = useState(0);
    const [stock, setStock] = useState("");
    const [stockArray, setStockArray] = useState([]);
    var axios = require("axios").default;

    const buybutton = (e) => {
        fetch("http://localhost:5050/bot/", {
            method: "GET",
            credentials: "include",
        })
            .then((response) => {
                console.log("response");

                console.log(response);
                return response.json();
            })
            .then((data) => {
                console.log("data");

                console.log(data);
            })
            .catch((error) => {
                console.log("login needed");
            });
    };

    const API_KEY = "V59N2LFKMSXQWONN";
    const sandboxToken = "Tpk_245594011ed142fca35e0d76758e1d33";
    const realToken = "pk_0e6314b0afd047f3bb2da2517debc3a0";
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const buyLocalButton = async () => {
        if (!stock) return;
        const real = `https://cloud.iexapis.com/stable/stock/${stock}/price?token=${realToken}`;
        const sandbox = `https://sandbox.iexapis.com/stable/stock/${stock}/price?token=${sandboxToken}`;
        const response = await fetch(sandbox)
            .then((response) => {
                console.log(response.status);
                if (response.status === 429) {
                    // console.log("here");
                    sleep(200).then(() => buyLocalButton());
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                console.log(typeof data);
                setCost(data);
            });
        // var options = {
        //   method: "GET",
        //   url: `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${stock}`,

        //   headers: {
        //     // "x-api-key": "mqGwUbeB2K1t2FFNFFXaV8mXEPBry3hX7rGo1R0n",
        //     "x-api-key": "oZqkJXbM3LwpyKw6OpkI16oyiCwa3yR3bOoUXeTg",
        //   },
        // };

        // axios
        //   .request(options)
        //   .then(function (response) {
        //     console.log(response);
        //     console.log(response.data.quoteResponse["result"][0]["ask"]);
        //     setCost(response.data.quoteResponse["result"][0]["ask"]);
        //   })
        //   .catch(function (error) {
        //     console.error(error);
        //   });
        if (balance - cost < 0) {
            alert("not enough funds");
        } else {
            setStockArray([...stockArray, stock]);
        }

        buystock();
        getBalance();
    };

    useEffect(() => {
        getBalance();
    }, [stock]);

    const buystock = () => {
        fetch("http://localhost:5050/api/buystock", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },

            body: JSON.stringify({ stock, price: cost, amount: 1 }),
        }).catch((error) => {
            console.log("error occured in buying stock");
        });
    };

    const getBalance = async () => {
        fetch("http://localhost:5050/api/getBalance", {
            method: "GET",
            credentials: "include",
            // headers: { "Content-Type": "application/json" },
            // body: JSON.stringify({ stock, price: cost, amount: 1 }),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setBalance(data.balance);
            })
            .catch((error) => {
                console.log("error occured in buying stock");
            });
    };

    return (
        <div className="papertrading">
            <Sidebar />
            <div className="trading">
                <div>
                    <span>Buy stock</span>
                    <div className="searchHeader">
                        Buy stock from Proview account
                    </div>
                    <div className="search">
                        <div className="input">
                            <StyledInput
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                placeholder="Search stock to buy"
                            />
                        </div>
                    </div>
                </div>
                <button className="searchButton" onClick={buyLocalButton}>
                    buy stock
                </button>
                <div key="uniqueId1">Your Stock: {stock}</div>
                <div key="uniqueId2">Your cost: {cost}</div>
                <div key="uniqueId3">Bought:</div>

                {stockArray.map((item) => {
                    return (
                        <a
                            target="_blank"
                            href={"https://finance.yahoo.com/quote/" + item}
                        >
                            <div key={uuid()}>{item}</div>
                        </a>
                    );
                })}
                <div>Balance: {balance}</div>

                <div>Buy stock from IBKR</div>
                <button onClick={buybutton}>buy stock</button>
            </div>
        </div>
    );
}

export default PaperTrading;
