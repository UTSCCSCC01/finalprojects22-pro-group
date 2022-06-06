import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

function Stock() {
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValues, setStockChartYValues] = useState([]);

  // const [StockSymbol, setStockSymbol] = useState("FB");

  const StockSymbol = "FB";
  const API_KEY = "THN5ITBH3LFSAWLV";

  // let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${StockSymbol}&output_size=compact&apikey=${API_KEY}`;

  const getStockRequest = async (StockSymbol) => {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${StockSymbol}&output_size=compact&apikey=${API_KEY}`;

    const response = await fetch(url);
    await response.json().then((data) => {
      for (const key in data["Time Series (Daily)"]) {
        setStockChartXValues((stockChartXValues) => [
          key,
          ...stockChartXValues,
        ]);
        setStockChartYValues((stockChartYValues) => [
          data["Time Series (Daily)"][key]["1. open"],

          ...stockChartYValues,
        ]);
      }
    });
  };

  useEffect(() => {
    getStockRequest(StockSymbol);
  }, []);
  console.log(stockChartXValues);
  console.log(stockChartYValues);

  return (
    <div>
      <h1>FB</h1>
      <Plot
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
          title: "StockSymbol",
          xaxis: { title: "TIME" },
          yaxis: { title: "COST" },
        }}
      />
    </div>
  );
}

export default Stock;
