import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

function Stock() {
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValues, setStockChartYValues] = useState([]);

  // const [StockSymbol, setStockSymbol] = useState("FB");

  const StockSymbol = "FB";
  const pointerToThis = this;
  const API_KEY = "THN5ITBH3LFSAWLV";

  // let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${StockSymbol}&output_size=compact&apikey=${API_KEY}`;

  const addStockX = (stockXValue) => {
    const newXList = [...stockChartXValues, stockXValue];
    setStockChartXValues(newXList);
  };
  const addStockY = (stockYValue) => {
    const newYList = [...stockChartYValues, stockYValue];
    setStockChartYValues(newYList);
  };

  // fetch(API_CALL)
  //   .then(function (response) {
  //     return response.json();
  //   })
  //   .then(function (data) {
  //     for (var key in data["Time Series (Daily)"]) {
  //       console.log(key, data["Time Series (Daily)"]);
  //       addStockX(key);
  //       addStockY(data["Time Series (Daily)"][key]["1. open"]);
  //     }
  //     pointerToThis.setState({
  //       stockChartXValues: stockChartXValuesFunction,
  //       stockChartYValues: stockChartYValuesFunction,
  //     });
  //   });
  const getStockRequest = async (StockSymbol) => {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${StockSymbol}&output_size=compact&apikey=${API_KEY}`;

    const response = await fetch(url);
    const responseJson = await response.json().then((data) => {
      for (const key in data["Time Series (Daily)"]) {
        addStockX(key);
        console.log(stockChartXValues);
        console.log(key);
        addStockY(data["Time Series (Daily)"][key]["1. open"]);
      }
    });
    // responseJson["Time Series (Daily)"].map((key) => {
    //   addStockX(key);
    //   addStockY(key["1. open"]);
    // });
  };

  useEffect(() => {
    getStockRequest(StockSymbol);
  }, []);

  // console.log(stockChartXValues);

  return (
    <div>
      {/* ${stockChartXValues } */}
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
        layout={{ width: 720, height: 500, title: "StockSymbol" }}
      />
    </div>
  );
}

export default Stock;
