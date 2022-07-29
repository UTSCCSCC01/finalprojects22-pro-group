import React from "react";
import { useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import "./AutoTrade.css";

function AutoTrade() {
    const [balance, setBalance] = useState(100000);

    const [cost, setCost] = useState(0);
    const [amount, setAmount] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState("");
    const [stockArray, setStockArray] = useState([]);
    const [diff, setDiff] = useState(0);
    const [soldArray, setSoldArray] = useState([]);

    useEffect(() => {
        setCost(amount * price);
    }, [amount, price]);

    useEffect(() => {
        getPrice();
    }, [amount, stock]);

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

  
      const getPrice = async () => {
        if (!stock) return;
      const real = `https://cloud.iexapis.com/stable/stock/${stock}/price?token=${realToken}`;
      const sandbox = `https://sandbox.iexapis.com/stable/stock/${stock}/price?token=${sandboxToken}`;
      const intraday=`https://sandbox.iexapis.com/stable/stock/${stock}/intraday-prices?token=${sandboxToken}`
      const response = await fetch(intraday)
            .then((response) => {
                if (response.status === 429) {
                    // console.log("here");
                    sleep(200).then(() => getPrice());
                }
                return response.json();
            })
          .then((data) => {
            var difference = data[data.length - 2]['high'] - data[data.length - 3]['high'];
                        console.log(difference);
            // setDiff(difference);
            console.log(data[data.length - 2]['high']);
            setPrice(data[data.length - 2]['high']);
            });
    };
  const algostock = async () => {
            console.log("stock");

      console.log(stock);

      //if difference >0, new is bigger than old, stock is going up, we want to buy
    if (diff >= 0) {
      if (balance - cost < 0) {
            alert("not enough funds");
        } else {
            setStockArray([...stockArray, stock]);
            await buystock();
        }

        getBalance();
        getStocksBought(); }
    else {
      console.log("less");
                  setSoldArray([...soldArray, stock]);
            // await sellstock();

    }
      //if difference <0, old is bigger than new, stock is going down, we want sell

  };

    useEffect(() => {
        getBalance();
        getStocksBought();
    }, [stock]);

    const buystock = () => {
        fetch("http://localhost:5050/api/buystock", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                stock,
                price: cost,
                amount: parseInt(amount),
            }),
        }).catch((error) => {
            console.log("error occured in buying stock");
        });

        setStock("");
        setAmount(0);
    };
  
      const sellstock = () => {
        fetch("http://localhost:5050/api/sellstock", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                stock,
                price: cost,
                amount: parseInt(amount),
            }),
        }).catch((error) => {
            console.log("error occured in selling stock");
        });

        setSoldArray("");
        setAmount(0);
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

    const getStocksBought = async () => {
        fetch("http://localhost:5050/api/getBought", {
            method: "GET",
            credentials: "include",
            // headers: { "Content-Type": "application/json" },
            // body: JSON.stringify({ stock, price: cost, amount: 1 }),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setStockArray(data.stocks);
            })
            .catch((error) => {
                console.log("error occured in buying stock");
            });
    };

    return (
        <div className="autotrade">
            <Sidebar />
            <div className="trading">
                <div>
                    <div className="searchHeader">
                        <h3>Buy stock with Autotrade</h3>
                    </div>
                    <div className="search">
                        <input
                            className="stock_input"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            placeholder="Search stock to buy"
                        />
                        <input
                            className="amount_input"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Set Amount"
                        />
                    </div>
          </div>
          
                 <button className="algo_stock" onClick={algostock}>
                     use algorithm on stock
                 </button>
                <div className="detail">
                    <div>Your Stock: {stock}</div>
                    <div>Current price: {price}</div>
                    <div>Your cost: {cost}</div>
                    <div>Bought:</div>

                    {stockArray.map((item, index) => {
                        return (
                            <div key={item.symbol} className="mystock">
                                <div>
                                    {item.symbol}: {item.amount}
                                </div>
                            </div>
                        );
                    })}
            <div>Sold:</div>
            
                    {soldArray.map((item, index) => {
                        return (
                            <div key={item.symbol} className="mystock">
                                <div>
                                    {item.symbol}: {item.amount}
                                </div>
                            </div>
                        );
                    })}
                    <div>Balance: {balance}</div>
                </div>


            </div>
        </div>
    );
}

export default AutoTrade;

