import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

function Stock_FB() {
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValues, setStockChartYValues] = useState([]);

  useEffect(() => {
    getStockRequest(StockSymbol);
  }, []);
  // const [StockSymbol, setStockSymbol] = useState("FB");

  const StockSymbol = "GOOG";
  const API_KEY = "THN5ITBH3LFSAWLV";

  // let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${StockSymbol}&output_size=compact&apikey=${API_KEY}`;

  const getStockRequest = async (StockSymbol) => {
    const check1 = localStorage.getItem("stockVals");
    if (check1) {
      for (const key in JSON.parse(check1)) {
        setStockChartYValues((stockChartYValues) => [
          ...stockChartYValues,
          JSON.parse(check1)[key]["1. open"],
        ]);

        setStockChartXValues((stockChartXValues) => [
          ...stockChartXValues,
          key,
        ]);
      }
    } else {
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${StockSymbol}&output_size=compact&apikey=${API_KEY}`;
      const response = await fetch(url);

      const data = await response.json();

      localStorage.setItem(
        "stockVals",
        JSON.stringify(data["Time Series (Daily)"])
      );

      data.then((data) => {
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
    }
  };

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
