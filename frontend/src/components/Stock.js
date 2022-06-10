import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

function Stock() {
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValues, setStockChartYValues] = useState([]);

  // const [StockSymbol, setStockSymbol] = useState("FB");

  const StockSymbol = "GOOG";
  const API_KEY2 = "pk_2f2f1ecce08045ba9fe8824d485939bb";

  const getStockRequest = async (StockSymbol) => {
    const url2 = `https://cloud.iexapis.com/stable/stock/${StockSymbol}/chart/3m?token=${API_KEY2}`;
    const url_volume =
      "https://cloud.iexapis.com/stable/stock/aapl/book?token=pk_2f2f1ecce08045ba9fe8824d485939bb";

    const response = await fetch(url2);

    await response.json().then((data) => {
      for (const key in data) {
        console.log(data[key]["date"]);
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
  };

  useEffect(() => {
    getStockRequest(StockSymbol);
  }, []);

  console.log(stockChartXValues);
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

export default Stock;
