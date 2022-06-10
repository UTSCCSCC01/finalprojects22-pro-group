import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

function Stock_FB() {
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValues, setStockChartYValues] = useState([]);

  // const [StockSymbol, setStockSymbol] = useState("FB");

  const StockSymbol = "GOOG";
  const API_KEY = "THN5ITBH3LFSAWLV";

  // let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${StockSymbol}&output_size=compact&apikey=${API_KEY}`;

  const getStockRequest = async (StockSymbol) => {
    const check1 = localStorage.getItem("stockChartXValues");
    const check2 = localStorage.getItem("stockChartYValues");
    if (check1) {
      setStockChartXValues(check1);
    }
    if (check2) {
      setStockChartYValues(check2);
    } else {
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${StockSymbol}&output_size=compact&apikey=${API_KEY}`;

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
        localStorage.setItem("stockChartYValues", stockChartYValues);
        localStorage.setItem("stockChartXValues", stockChartXValues);
      });
    }
  };

  useEffect(() => {
    getStockRequest(StockSymbol);
  }, []);

  stockChartXValues.slice(-1);

  return (
    <>
      <div>
        <h1>Google</h1>
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
    </>
  );
}

export default Stock_FB;
