import React, { useState } from "react";
import Plot from "react-plotly.js";

class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: [],
    };
  }

  componentDidMount() {
    this.fetchStock();
  }

  fetchStock() {
    // const [StockSymbol, setStockSymbol] = useState("FB");
    const StockSymbol = "FB";
    const pointerToThis = this;
    const API_KEY = "THN5ITBH3LFSAWLV";

    let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${StockSymbol}&output_size=compact&apikey=${API_KEY}`;
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];

    fetch(API_CALL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        for (var key in data["Time Series (Daily)"]) {
          stockChartXValuesFunction.push(key);
          stockChartYValuesFunction.push(
            data["Time Series (Daily)"][key]["1. open"]
          );
        }

        pointerToThis.setState({
          stockChartXValues: stockChartXValuesFunction,
          stockChartYValues: stockChartYValuesFunction,
        });
      });
  }

  render() {
    return (
      <div>
        <h1>FB</h1>
        <Plot
          data={[
            {
              x: this.state.stockChartXValues,
              y: this.state.stockChartYValues,
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
}
export default Stock;
