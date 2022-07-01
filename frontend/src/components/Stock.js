import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import "./Stock.css";

function Stock({ stockSymbol }) {
    //const navigate = useNavigate();
    const [stockChartXValues, setStockChartXValues] = useState([]);
    const [stockChartYValues, setStockChartYValues] = useState([]);

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
    };

    useEffect(() => {
        getStockRequest(stockSymbol);
    }, []);

    stockChartXValues.slice(-1);

    return (
        <div className="stock">
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
