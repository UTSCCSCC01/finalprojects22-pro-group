import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

import "./Stock.css";

function Stock({ stockSymbol }) {
    // const KEYS = ["THN5ITBH3LFSAWLV", "V59N2LFKMSXQWONN"];
//date
    const [stockChartXValues, setStockChartXValues] = useState([]);
    //close
    const [stockChartYValues, setStockChartYValues] = useState([]);
    const [stockChartHigh, setStockChartHigh] = useState([]);
    const [stockChartOpen, setStockChartOpen] = useState([]);
    const [stockChartLow, setStockChartLow] = useState([]);


    // const [index, setIndex] = useState([]);

    useEffect(() => {
        setStockChartXValues([]);
        setStockChartYValues([]);
        console.log(stockSymbol);
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
        const response = await fetch(sandbox)
            .then((response) => {
                console.log(response.status);
                if (response.status === 429) {
                    // console.log("here");
                    sleep(200).then(() => getStockRequest(stockSymbol));
                }
                return response.json();
            })
            .then((data) => {
                                    console.log(data);

                for (const key in data) {
                    console.log(data[key]);
                    console.log(data[key]["date"]);
                    console.log(data[key]["high"]);
                    console.log(data[key]["low"]);
                    console.log(data[key]["open"]);



                    setStockChartXValues((stockChartXValues) => [
                        ...stockChartXValues,
                        data[key]["date"],
                    ]);
                    setStockChartYValues((stockChartYValues) => [
                        ...stockChartYValues,
                        data[key]["close"],
                    ]);
                    setStockChartHigh((stockChartHigh) => [
                        ...stockChartHigh,
                        data[key]["high"],
                    ]);
                    setStockChartOpen((stockChartOpen) => [
                        ...stockChartOpen,
                        data[key]["open"],
                    ]);
                    setStockChartLow((stockChartLow) => [
                        ...stockChartLow,
                        data[key]["low"],
                    ]);
                }
            });
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

    var trace1 = {
  
  x: stockChartXValues, 
  
  close: stockChartYValues, 
  
  decreasing: {line: {color: '#FF0000'}}, 
  
  high: stockChartHigh, 
  
  increasing: {line: {color: '#00d719'}}, 
  
  line: {color: '#00d719'}, 
  
  low: stockChartLow, 
  
  open: stockChartOpen, 
  
  type: 'candlestick', 
  xaxis: 'x', 
  yaxis: 'y'
};

var data = [trace1];

var layout = {
  dragmode: 'zoom', 
  margin: {
    r: 10, 
    t: 25, 
    b: 40, 
    l: 60
  }, 
  showlegend: false, 
  xaxis: {
    autorange: true, 
    // rangeslider: {range: ['2022-01-17 12:00', '2022-12-10 12:00']}, 
    title: 'Date', 
    type: 'date'
  }, 
  yaxis: {
    autorange: true, 
    type: 'linear'
  },
  
//   annotations: [
//     {
//       x: '2017-01-31',
//       y: 0.9,
//       xref: 'x',
//       yref: 'paper',
//       text: 'largest movement',
//       font: {color: 'magenta'},
//       showarrow: true,
//       xanchor: 'right',
//       ax: -20,
//       ay: 0
//     }
//   ],
  
//   shapes: [
//       {
//           type: 'rect',
//           xref: 'x',
//           yref: 'paper',
//           x0: '2022-01-31',
//           y0: 0,
//           x1: '2022-02-01',
//           y1: 1,
//           fillcolor: '#d3d3d3',
//           opacity: 0.2,
//           line: {
//               width: 0
//           }
//       }
//     ]
};

    // Plotly.newPlot('myDiv', data, layout);
    
    // setTimeout('getStockRequest', 1000);
    return (
        <div className="stock">
            <h4>{stockSymbol}</h4>
            

             <Plot
                className="stockPlot"
                data={data}
                layout={layout}
            /> 



            {/* <Plot
                className="stockPlot"
                data={[
                    {
                        x: stockChartXValues,
                        y: stockChartYValues,
                        type: "candlestick",
                        // mode: "lines+markers",
                        marker: { color: "#00ac14" },
                    },
                ]}
                layout={{
                    width: 720,
                    height: 500,
                    title: { stockSymbol },
                    plot_bgcolor: "#f3f4f6",
                    paper_bgcolor: "#f3f4f6",
                    xaxis: { title: "TIME" },
                    yaxis: { title: "COST" },
                }}
            /> */}
        </div>
    );
}

export default Stock;
