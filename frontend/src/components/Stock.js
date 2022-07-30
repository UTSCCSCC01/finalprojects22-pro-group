import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

import "./Stock.css";

function Stock({ stockSymbol }) {
    // const KEYS = ["THN5ITBH3LFSAWLV", "V59N2LFKMSXQWONN"];

    const [stockChartXValues, setStockChartXValues] = useState([]);
    const [stockChartYValues, setStockChartYValues] = useState([]);
    // const [index, setIndex] = useState([]);

    useEffect(() => {
        setStockChartXValues([]);
        setStockChartYValues([]);
        // console.log(stockSymbol);
        getStockRequest(stockSymbol);
    }, [stockSymbol]);
    // const [StockSymbol, setStockSymbol] = useState("FB");

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    //const StockSymbol = "GOOG";
    const API_KEY = "V59N2LFKMSXQWONN";
    const sandboxToken = "Tpk_245594011ed142fca35e0d76758e1d33";
    const realToken = "pk_0e6314b0afd047f3bb2da2517debc3a0";
    //url = `https://sandbox.iexapis.com/stable/stock/AAPL/time-series/?token=Tpk_245594011ed142fca35e0d76758e1d33`

    // let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${StockSymbol}&output_size=compact&apikey=${API_KEY}`;

    const getStockRequest = async (stockSymbol) => {
        if (!stockSymbol) return;
        const real = `https://cloud.iexapis.com/stable/stock/${stockSymbol}/chart/3m?token=${realToken}`;
        const sandbox = `https://sandbox.iexapis.com/stable/stock/${stockSymbol}/chart/3m?token=${sandboxToken}`;
        // back off function
        const response = await fetch(sandbox, {
            retryDelay: function (attempt) {
                return Math.pow(2, attempt) * 1000; // 1000, 2000, 4000
            },
        })
            .then((response) => {
                // console.log(response.status);
                // console.log(response);
                if (response.status === 429) {
                    // console.log("here");
                    sleep(200).then(() => getStockRequest(stockSymbol));
                    // return;
                }
                return response.json();
            })
            .then((data) => {
                setStockChartXValues([]);
                setStockChartYValues([]);
                for (const key in data) {
                    //console.log(data[key]["date"]);
                    setStockChartXValues((stockChartXValues) => [
                        ...stockChartXValues,
                        data[key]["date"],
                    ]);
                    setStockChartYValues((stockChartYValues) => [
                        ...stockChartYValues,
                        data[key]["close"],
                    ]);
                }
            });

        // const response = await fetch(sandbox)
        //     .then((response) => {
        //         console.log(response.status);
        //         // console.log(response);
        //         if (response.status === 429) {
        //             // console.log("here");
        //             sleep(200).then(() => getStockRequest(stockSymbol));
        //             // return;
        //         }
        //         return response.json();
        //     })
        //     .then((data) => {
        //         setStockChartXValues([]);
        //         setStockChartYValues([]);
        //         for (const key in data) {
        //             //console.log(data[key]["date"]);
        //             setStockChartXValues((stockChartXValues) => [
        //                 ...stockChartXValues,
        //                 data[key]["date"],
        //             ]);
        //             setStockChartYValues((stockChartYValues) => [
        //                 ...stockChartYValues,
        //                 data[key]["close"],
        //             ]);
        //         }
        //     });
    };
    // const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&output_size=compact&apikey=${API_KEY}`;

    // const response = await fetch(url);
    // await response.json().then((data) => {
    //     for (const key in data["Time Series (Daily)"]) {
    //         setStockChartXValues((stockChartXValues) => [
    //             ...stockChartXValues,
    //             key,
    //         ]);
    //         setStockChartYValues((stockChartYValues) => [
    //             ...stockChartYValues,
    //             data["Time Series (Daily)"][key]["1. open"],
    //         ]);
    //     }
    // });

    stockChartXValues.slice(-1);
    // setTimeout('getStockRequest', 1000);
    return (
        <div className="stock">
            <h4>{stockSymbol}</h4>
            <div className="plot">
                <Plot
                    className="stockPlot"
                    data={[
                        {
                            x: stockChartXValues,
                            y: stockChartYValues,
                            type: "scatter",
                            mode: "lines+markers",
                            marker: { color: "#00ac14" },
                        },
                    ]}
                    layout={{
                        width: 800,
                        height: 600,
                        title: { stockSymbol },
                        plot_bgcolor: "#f3f4f6",
                        paper_bgcolor: "#f3f4f6",
                        xaxis: { title: "TIME" },
                        yaxis: { title: "COST" },
                    }}
                />
            </div>
        </div>
    );
}

export default Stock;
