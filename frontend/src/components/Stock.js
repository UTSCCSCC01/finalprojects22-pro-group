import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

import "./Stock.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Alarm from "./AlarmComp";
// import "fdweb/fluent.css"

function Stock({ stockSymbol }) {
    const navigate = useNavigate();

    const [stockChartXValues, setStockChartXValues] = useState([]);
    const [stockChartYValues, setStockChartYValues] = useState([]);

    useEffect(() => {
        console.log(stockSymbol);
        getStockRequest(stockSymbol);
    }, []);
    // const [StockSymbol, setStockSymbol] = useState("FB");

    //const StockSymbol = "GOOG";
    const API_KEY = "THN5ITBH3LFSAWLV";

    // let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${StockSymbol}&output_size=compact&apikey=${API_KEY}`;

    const getStockRequest = async (stockSymbol) => {
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&output_size=compact&apikey=${API_KEY}`;

        const response = await fetch(url);
        await response.json().then((data) => {
            for (const key in data["Time Series (Daily)"]) {
                setStockChartXValues((stockChartXValues) => [
                    ...stockChartXValues,
                    key,
                ]);
                setStockChartYValues((stockChartYValues) => [
                    ...stockChartYValues,
                    data["Time Series (Daily)"][key]["1. open"],
                ]);
            }
        });
        //const check1 = localStorage.getItem("stockVals");

        // if (check1) {
        //     console.log("blahhhh");
        //     for (const key in JSON.parse(check1)) {
        //         setStockChartYValues((stockChartYValues) => [
        //             ...stockChartYValues,
        //             JSON.parse(check1)[key]["1. open"],
        //         ]);

        //         setStockChartXValues((stockChartXValues) => [
        //             ...stockChartXValues,
        //             key,
        //         ]);
        //     }
        // } else {
        // const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&output_size=compact&apikey=${API_KEY}`;
        // const response = await fetch(url);

        // const data = await response.json();

        // localStorage.setItem(
        //     "stockVals",
        //     JSON.stringify(data["Time Series (Daily)"])
        // );

        // data.then((data) => {
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
        //}
    };

    stockChartXValues.slice(-1);

    return (

        <div className="stock">
            <h4>{stockSymbol}</h4>
            <Plot
                className="stockPlot"
                data={[
                    {
                        x: stockChartXValues,
                        y: stockChartYValues,
                        type: "scatter",
                        mode: "lines+markers",
                        marker: { color: "blue" },
                    },
                ]}
                layout={{
                    width: 720,
                    height: 500,
                    title: { stockSymbol },
                    xaxis: { title: "TIME" },
                    yaxis: { title: "COST" },
                }}
            />
        </div>

    );
}

export default Stock;
